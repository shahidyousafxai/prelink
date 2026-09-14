import { Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenHeader from '../../components/ScreenHeader';
import ConsentBlock from '../../components/ConsentBlock';
import ToggleRow from '../../components/ToggleRow';
import PrimaryButton from '../../components/PrimaryButton';
import { colors, fonts } from '../../theme/theme';

// Stage 1 of 4 — the only consent required to use PreLink at all. The other
// three stages (pattern awareness, caregiver sharing, clinical escalation)
// are shown later, contextually, not as part of onboarding.
export default function ConsentScreen({ navigation }) {
  const { control, watch } = useForm({ defaultValues: { agree: false } });
  const agreed = watch('agree');

  return (
    <ScreenLayout center={false}>
      <ScreenHeader
        eyebrow="Before we begin"
        badge="Consent 1 of 4"
        headline="Wellness support only"
        sub="This is the only consent needed to use PreLink at all. Nothing else is bundled in."
      />
      <Text style={styles.note}>Stages 2–4 show up later, only when relevant — not right after this.</Text>

      <ConsentBlock
        badge="This stage"
        title="Daily check-ins"
        description="PreLink notices everyday patterns in mood, movement, and habits. It does not diagnose or predict any condition."
      />
      <ConsentBlock
        title="Later, if you choose"
        description="Pattern awareness, caregiver sharing, and clinician review are separate, optional stages."
        dimmed
      />

      <ToggleRow control={control} name="agree" label="I understand and agree" />

      <PrimaryButton
        label="Continue"
        onPress={() => navigation.navigate('OnboardingBaseline')}
        disabled={!agreed}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  note: { fontSize: 11, fontFamily: fonts.body, color: colors.inkSoft, marginBottom: 16 },
});
