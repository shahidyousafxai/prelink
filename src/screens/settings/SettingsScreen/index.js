import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import SectionTitle from '../../../components/shared/SectionTitle';
import SettingsRow from '../../../components/SettingsRow';
import Card from '../../../components/shared/Card';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import FormError from '../../../components/shared/FormError';
import { useLogoutMutation } from '../../../network/authentication/authQueries';
import { useLanguageQuery } from '../../../network/language/languageQueries';
import { getLanguageMeta } from '../../../i18n/languages';
import { colors } from '../../../theme/theme';
import { styles } from './styles';

// The "You" tab's list screen (SettingsStack's root route). Manage Consent /
// Invite a Caregiver / About / Language are separate routes in that same
// stack now, reached via navigation.navigate below. Rows are grouped into
// cards per section (standard grouped-list look) instead of floating as
// bare bordered rows directly on the sand background.
export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const logout = useLogoutMutation();
  const { language } = useLanguageQuery();

  return (
    <ScreenLayout center={false} tabBarInset>
      <ScreenHeader headline={t('settings.settings.headline')} />

      <SectionTitle>{t('settings.settings.sectionConsent')}</SectionTitle>
      <Card style={styles.card}>
        <SettingsRow
          label={t('settings.settings.manageConsent')}
          icon="shield-checkmark-outline"
          accent={colors.pine}
          onPress={() => navigation.navigate('ManageConsent')}
        />
        <SettingsRow
          label={t('settings.settings.inviteCaregiver')}
          icon="people-outline"
          accent={colors.clay}
          onPress={() => navigation.navigate('InviteCaregiver')}
        />
        <SettingsRow
          label={t('settings.settings.about')}
          icon="information-circle-outline"
          accent={colors.gold}
          onPress={() => navigation.navigate('About')}
          last
        />
      </Card>

      <SectionTitle>{t('settings.settings.sectionAccount')}</SectionTitle>
      <Card style={styles.card}>
        <SettingsRow
          label={t('settings.settings.language')}
          value={getLanguageMeta(language).label}
          icon="globe-outline"
          accent={colors.ink}
          onPress={() => navigation.navigate('Language')}
          last
        />
      </Card>

      {/* These roles have no real separate login in this app — mirrors the
          prototype's own "Preview controls" role switcher rather than
          pretending Caregiver/Clinician are signed-in accounts. */}
      <SectionTitle>{t('settings.settings.sectionPreview')}</SectionTitle>
      <Card style={styles.card}>
        <SettingsRow
          label={t('settings.settings.previewCaregiver')}
          icon="eye-outline"
          accent={colors.clay}
          onPress={() => navigation.navigate('CaregiverHome')}
        />
        <SettingsRow
          label={t('settings.settings.previewClinician')}
          icon="medkit-outline"
          accent={colors.pine}
          onPress={() => navigation.navigate('ClinicianGate')}
        />
        <SettingsRow
          label={t('settings.settings.previewNotifications')}
          icon="notifications-outline"
          accent={colors.gold}
          onPress={() => navigation.navigate('Notifications')}
          last
        />
      </Card>

      <View style={styles.logoutWrap}>
        {/* Logging out flips auth state; RootNavigator swaps back to the
            public stack automatically. */}
        <PrimaryButton
          label={logout.isPending ? t('settings.settings.loggingOut') : t('settings.settings.logout')}
          onPress={() => logout.mutate()}
          loading={logout.isPending}
        />
        <FormError message={logout.isError ? logout.error.message : null} />
      </View>

      <TextLink label={t('settings.settings.deleteData')} variant="danger" onPress={() => setShowDeleteWarning((v) => !v)} />
      {showDeleteWarning && <FormError message={t('settings.settings.deleteWarning')} />}
    </ScreenLayout>
  );
}
