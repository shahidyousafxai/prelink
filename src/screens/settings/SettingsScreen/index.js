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
import ManageConsentView from './ManageConsentView';
import InviteCaregiverView from './InviteCaregiverView';
import AboutView from './AboutView';
import LanguageView from './LanguageView';
import { styles } from './styles';

const VIEWS = {
  LIST: 'list',
  MANAGE_CONSENT: 'manageConsent',
  INVITE_CAREGIVER: 'inviteCaregiver',
  ABOUT: 'about',
  LANGUAGE: 'language',
};

// The "You" tab in MainTabs. It's a tab root (no push stack), so sub-screens
// (Manage Consent / Invite a Caregiver / About / Language) are switched via
// local view-state rather than real navigation routes — the same
// single-page approach the prototype itself uses for these.
export default function SettingsScreen({ navigation }) {
  const { t } = useTranslation();
  const [view, setView] = useState(VIEWS.LIST);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const logout = useLogoutMutation();
  const { language } = useLanguageQuery();

  const goToList = () => setView(VIEWS.LIST);

  if (view === VIEWS.MANAGE_CONSENT) {
    return (
      <ScreenLayout center={false}>
        <ManageConsentView onBack={goToList} />
      </ScreenLayout>
    );
  }

  if (view === VIEWS.INVITE_CAREGIVER) {
    return (
      <ScreenLayout center={false}>
        <InviteCaregiverView onBack={goToList} />
      </ScreenLayout>
    );
  }

  if (view === VIEWS.ABOUT) {
    return (
      <ScreenLayout center={false}>
        <AboutView onBack={goToList} />
      </ScreenLayout>
    );
  }

  if (view === VIEWS.LANGUAGE) {
    return (
      <ScreenLayout center={false}>
        <LanguageView selected={language} onSelect={goToList} onBack={goToList} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout center={false}>
      <ScreenHeader headline={t('settings.settings.headline')} />

      <SectionTitle>{t('settings.settings.sectionConsent')}</SectionTitle>
      <SettingsRow label={t('settings.settings.manageConsent')} onPress={() => setView(VIEWS.MANAGE_CONSENT)} />
      <SettingsRow label={t('settings.settings.inviteCaregiver')} onPress={() => setView(VIEWS.INVITE_CAREGIVER)} />
      <SettingsRow label={t('settings.settings.about')} onPress={() => setView(VIEWS.ABOUT)} last />

      <SectionTitle>{t('settings.settings.sectionAccount')}</SectionTitle>
      <SettingsRow
        label={t('settings.settings.language')}
        value={getLanguageMeta(language).label}
        onPress={() => setView(VIEWS.LANGUAGE)}
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
