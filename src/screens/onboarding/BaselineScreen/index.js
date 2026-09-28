import { View, Text, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import OnboardingWizardLayout from '../../../components/OnboardingWizardLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import AnimatedPressable from '../../../components/shared/AnimatedPressable';
import { useCompleteOnboardingMutation } from '../../../network/authentication/authQueries';
import { colors, fonts, radius, shadows } from '../../../theme/theme';

// Form values stay pinned to the fixed English option strings (used as
// react-hook-form field values, not display text) so switching language
// mid-flow never invalidates an already-selected default; only the chip
// labels shown to the user are translated, via SLEEP_KEYS/CARE_KEYS below.
const SLEEP_KEYS = ['Good', 'Okay', 'Rough'];
const CARE_KEYS = ['Just me for now', 'A family member', 'A clinician already'];

// Each question is its own card (icon avatar + question + options) instead
// of the shared, plain pill-chip ChipGroup — matching the bigger, bolder
// "action card" language established on the Language/Consent screens rather
// than the app's default small chips.
function QuestionCard({ icon, accent, question, options, valueKeys, value, onChange }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.avatar, { backgroundColor: accent }]}>
          <Ionicons name={icon} size={20} color={colors.white} />
        </View>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View style={styles.options}>
        {options.map((option, index) => {
          const key = valueKeys[index];
          const selected = value === key;
          return (
            <AnimatedPressable
              key={key}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => onChange(key)}
              scaleTo={0.96}
            >
              <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{option}</Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

export default function BaselineScreen({ navigation }) {
  const { t } = useTranslation();
  const completeOnboarding = useCompleteOnboardingMutation();
  const { control } = useForm({
    defaultValues: { sleep: 'Okay', care: 'Just me for now' },
  });

  const sleepLabels = t('onboarding.baseline.sleepOptions', { returnObjects: true });
  const careLabels = t('onboarding.baseline.careOptions', { returnObjects: true });

  return (
    <OnboardingWizardLayout
      step={3}
      totalSteps={3}
      backLabel={t('common.back.consent')}
      onBack={() => navigation.goBack()}
      primaryLabel={t('onboarding.baseline.continue')}
      // Completing onboarding flips auth state; RootNavigator swaps to Home
      // automatically, so no manual navigation call is needed here.
      onPrimaryPress={() => completeOnboarding.mutate()}
      primaryLoading={completeOnboarding.isPending}
    >
      <ScreenHeader headline={t('onboarding.baseline.headline')} sub={t('onboarding.baseline.sub')} />

      <Controller
        control={control}
        name="sleep"
        render={({ field: { value, onChange } }) => (
          <QuestionCard
            icon="moon-outline"
            accent={colors.pine}
            question={t('onboarding.baseline.sleepLabel')}
            options={sleepLabels}
            valueKeys={SLEEP_KEYS}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="care"
        render={({ field: { value, onChange } }) => (
          <QuestionCard
            icon="people-outline"
            accent={colors.clay}
            question={t('onboarding.baseline.careLabel')}
            options={careLabels}
            valueKeys={CARE_KEYS}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </OnboardingWizardLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 18,
    marginBottom: 14,
    ...shadows.md,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: { flex: 1, fontSize: 14, fontFamily: fonts.bodyBold, color: colors.ink },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionSelected: { borderColor: colors.gold, backgroundColor: colors.goldSoft },
  optionLabel: { fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.inkSoft },
  optionLabelSelected: { color: '#7A5A1E' },
});
