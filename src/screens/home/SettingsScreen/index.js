import { useState } from 'react';
import { View } from 'react-native';

import ScreenLayout from '../../../components/ScreenLayout';
import ScreenHeader from '../../../components/ScreenHeader';
import SectionTitle from '../../../components/SectionTitle';
import SettingsRow from '../../../components/SettingsRow';
import PrimaryButton from '../../../components/PrimaryButton';
import TextLink from '../../../components/TextLink';
import FormError from '../../../components/FormError';
import { useLogoutMutation } from '../../../network/authentication/authQueries';
import ManageConsentView from './ManageConsentView';
import InviteCaregiverView from './InviteCaregiverView';
import AboutView from './AboutView';
import LanguageView from './LanguageView';
import { styles } from './styles';

const LANGUAGE_LABELS = { en: 'English', ar: 'Arabic', fr: 'French', ur: 'Urdu' };

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
  const [view, setView] = useState(VIEWS.LIST);
  const [language, setLanguage] = useState('en');
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const logout = useLogoutMutation();

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
        <LanguageView
          selected={language}
          onSelect={(code) => {
            setLanguage(code);
            goToList();
          }}
          onBack={goToList}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout center={false}>
      <ScreenHeader headline="Settings" />

      <SectionTitle>Consent & sharing</SectionTitle>
      <SettingsRow label="Manage consent & sharing" onPress={() => setView(VIEWS.MANAGE_CONSENT)} />
      <SettingsRow label="Invite a caregiver" onPress={() => setView(VIEWS.INVITE_CAREGIVER)} />
      <SettingsRow label="About PreLink & your data" onPress={() => setView(VIEWS.ABOUT)} last />

      <SectionTitle>Account</SectionTitle>
      <SettingsRow label="Language" value={LANGUAGE_LABELS[language]} onPress={() => setView(VIEWS.LANGUAGE)} last />

      {/* These roles have no real separate login in this app — mirrors the
          prototype's own "Preview controls" role switcher rather than
          pretending Caregiver/Clinician are signed-in accounts. */}
      <SectionTitle>Preview controls</SectionTitle>
      <SettingsRow label="Preview: Caregiver view" onPress={() => navigation.navigate('CaregiverHome')} />
      <SettingsRow label="Preview: Clinician portal" onPress={() => navigation.navigate('ClinicianGate')} />
      <SettingsRow
        label="Preview: Contextual prompts"
        onPress={() => navigation.navigate('Notifications')}
        last
      />

      <View style={styles.logoutWrap}>
        {/* Logging out flips auth state; RootNavigator swaps back to the
            public stack automatically. */}
        <PrimaryButton
          label={logout.isPending ? 'Logging out...' : 'Log out'}
          onPress={() => logout.mutate()}
          loading={logout.isPending}
        />
        <FormError message={logout.isError ? logout.error.message : null} />
      </View>

      <TextLink label="Delete my data" variant="danger" onPress={() => setShowDeleteWarning((v) => !v)} />
      {showDeleteWarning && (
        <FormError message="This can't be undone. (Preview only — no data is actually deleted here.)" />
      )}
    </ScreenLayout>
  );
}
