import { View, Text, Switch, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import OnboardingWizardLayout from '../../../components/OnboardingWizardLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import { colors, fonts, radius, shadows } from '../../../theme/theme';

// Stage 1 of 4 — the only consent required to use PreLink at all. The other
// three stages (pattern awareness, caregiver sharing, clinical escalation)
// are shown later, contextually, not as part of onboarding. The "Consent 1
// of 4" badge below is that separate, app-wide consent system — unrelated
// to this wizard's own step 2-of-3 progress bar.
//
// Info + the agreement toggle are built inline here as one consolidated
// card (icon avatar, title, description, divider, toggle) instead of reusing
// the shared ConsentBlock/ToggleRow boxes stacked separately — that read as
// two disconnected plain boxes; this reads as one deliberate "action card".
export default function ConsentScreen({ navigation }) {
  const { t } = useTranslation();
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');

  return (
    <OnboardingWizardLayout
      step={2}
      totalSteps={3}
      backLabel={t('common.back.language')}
      onBack={() => navigation.goBack()}
      primaryLabel={t('onboarding.consent.continue')}
      onPrimaryPress={() => navigation.navigate('OnboardingBaseline')}
      primaryDisabled={!agreed}
    >
      <ScreenHeader
        badge={t('onboarding.consent.badge')}
        headline={t('onboarding.consent.headline')}
        sub={t('onboarding.consent.sub')}
      />

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="checkmark-circle" size={28} color={colors.white} />
        </View>
        <Text style={styles.title}>{t('onboarding.consent.stage1Title')}</Text>
        <Text style={styles.description}>{t('onboarding.consent.stage1Description')}</Text>

        <View style={styles.divider} />

        <Controller
          control={control}
          name="agree"
          render={({ field: { value, onChange } }) => (
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{t('onboarding.consent.agree')}</Text>
              <Switch
                value={!!value}
                onValueChange={onChange}
                trackColor={{ false: colors.line, true: colors.pine }}
                thumbColor={colors.white}
              />
            </View>
          )}
        />
      </View>
    </OnboardingWizardLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: 20,
    ...shadows.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.pine,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 16, fontFamily: fonts.bodyBold, color: colors.ink, marginBottom: 6 },
  description: { fontSize: 13, fontFamily: fonts.body, color: colors.inkSoft, lineHeight: 19.5 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 18 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  toggleLabel: { flex: 1, fontSize: 13.5, fontFamily: fonts.bodySemiBold, color: colors.ink },
});
