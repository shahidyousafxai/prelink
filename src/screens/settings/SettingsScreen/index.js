import { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import SectionTitle from '../../../components/shared/SectionTitle';
import SettingsRow from '../../../components/SettingsRow';
import PrimaryButton from '../../../components/shared/PrimaryButton';
import TextLink from '../../../components/shared/TextLink';
import FormError from '../../../components/shared/FormError';
import { useLogoutMutation } from '../../../network/authentication/authQueries';
import { useLanguageQuery } from '../../../network/language/languageQueries';
import { getLanguageMeta } from '../../../i18n/languages';
import { styles } from './styles';

// The "You" tab's list screen (SettingsStack's root route). Manage Consent /
// Invite a Caregiver / About / Language are separate routes in that same
// stack now, reached via navigation.navigate below.
export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const logout = useLogoutMutation();
  const { language } = useLanguageQuery();

  return (
    <ScreenLayout center={false} tabBarInset>
      <ScreenHeader headline={t('settings.settings.headline')} />

      <SectionTitle>{t('settings.settings.sectionConsent')}</SectionTitle>
      <SettingsRow label={t('settings.settings.manageConsent')} onPress={() => navigation.navigate('ManageConsent')} />
      <SettingsRow label={t('settings.settings.inviteCaregiver')} onPress={() => navigation.navigate('InviteCaregiver')} />
      <SettingsRow label={t('settings.settings.about')} onPress={() => navigation.navigate('About')} last />

      <SectionTitle>{t('settings.settings.sectionAccount')}</SectionTitle>
      <SettingsRow
        label={t('settings.settings.language')}
        value={getLanguageMeta(language).label}
        onPress={() => navigation.navigate('Language')}
        last
      />

      {/* These roles have no real separate login in this app — mirrors the
          prototype's own "Preview controls" role switcher rather than
          pretending Caregiver/Clinician are signed-in accounts. */}
      <SectionTitle>{t('settings.settings.sectionPreview')}</SectionTitle>
      <SettingsRow label={t('settings.settings.previewCaregiver')} onPress={() => navigation.navigate('CaregiverHome')} />
      <SettingsRow label={t('settings.settings.previewClinician')} onPress={() => navigation.navigate('ClinicianGate')} />
      <SettingsRow
        label={t('settings.settings.previewNotifications')}
        onPress={() => navigation.navigate('Notifications')}
        last
      />

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
