import { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import BackButton from '../../../components/shared/BackButton';
import Avatar from '../../../components/shared/Avatar';
import Card from '../../../components/shared/Card';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import ConfirmBanner from '../../../components/shared/ConfirmBanner';
import { useConsentQuery } from '../../../network/consent/consentQueries';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// A genuinely separate role, not a filtered version of the patient's own
// screens — locked until the Stage 3 caregiver invite is actually sent
// (Settings → Invite a caregiver), which is enforced here, not just
// described. Reached via Settings → Preview: Caregiver view, mirroring the
// prototype's own "Preview controls" role switcher rather than a real,
// separate caregiver login (which this app doesn't implement).
export default function CaregiverHomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();
  const [encouraged, setEncouraged] = useState(false);

  const backToSettings = () => navigation.navigate('Main', { screen: 'You' });

  if (!consent?.s3) {
    return (
      <ScreenLayout center={false}>
        <BackButton label={t('common.back.settings')} onPress={backToSettings} />
        <View style={styles.centerFlow}>
          <Ionicons name="hourglass-outline" size={30} color={colors.inkSoft} style={styles.lockedIcon} />
          <Text style={styles.lockedTitle}>{t('home.caregiverHome.lockedTitle')}</Text>
          <Text style={styles.lockedSub}>{t('home.caregiverHome.lockedSub')}</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout center={false}>
      <BackButton label={t('common.back.settings')} onPress={backToSettings} />
      <Text style={styles.eyebrow}>{t('home.caregiverHome.eyebrow')}</Text>
      <View style={styles.header}>
        <Avatar initial="M" />
        <View style={styles.headerText}>
          <Text style={styles.name}>{t('home.caregiverHome.circleName')}</Text>
          <Text style={styles.summaryOnly}>{t('home.caregiverHome.summaryOnly')}</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardLabel}>{t('home.caregiverHome.thisWeekLabel')}</Text>
        <Text style={styles.cardBody}>{t('home.caregiverHome.thisWeekBody')}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.cardLabel}>{t('home.caregiverHome.engagementLabel')}</Text>
        <Text style={styles.cardBody}>{t('home.caregiverHome.engagementBody')}</Text>
      </Card>

      {encouraged ? (
        <ConfirmBanner>{t('home.caregiverHome.encouragementSent')}</ConfirmBanner>
      ) : (
        <PrimaryButton label={t('home.caregiverHome.sendEncouragement')} onPress={() => setEncouraged(true)} />
      )}

      <Text style={styles.trustNote}>{t('home.caregiverHome.trustNote')}</Text>
    </ScreenLayout>
  );
}
