import { View, Text, Switch, StyleSheet, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import ScreenLayout from '../../../components/shared/ScreenLayout';
import ScreenHeader from '../../../components/shared/ScreenHeader';
import BackButton from '../../../components/shared/BackButton';
import Card from '../../../components/shared/Card';
import { useConsentQuery, useSetConsentStage } from '../../../network/consent/consentQueries';
import { colors, fonts } from '../../../theme/theme';

const STAGE_META = [
  { key: 's1', icon: 'heart-outline', accent: colors.pine },
  { key: 's2', icon: 'trending-up-outline', accent: colors.gold },
  { key: 's3', icon: 'people-outline', accent: colors.clay },
  { key: 's4', icon: 'medkit-outline', accent: colors.ink },
];

// Every stage you've granted anywhere in the app (e.g. Stage 2 from the
// Assessment Task flow) shows up here live, and can be turned off
// independently — this is the actual proof that consent isn't a one-time
// checkbox. Reads the same shared consent state as the rest of the app, not
// a private copy. Grouped into one card (icon + label + switch per row)
// instead of 4 separate boxed ToggleRows, matching the Settings list style.
export default function ManageConsentView({ navigation }) {
  const { t } = useTranslation();
  const { data: consent } = useConsentQuery();
  const setConsentStage = useSetConsentStage();

  return (
    <ScreenLayout center={false} tabBarInset>
      <BackButton label={t('common.back.settings')} onPress={() => navigation.goBack()} />
      <ScreenHeader headline={t('settings.manageConsent.headline')} sub={t('settings.manageConsent.sub')} />
      <Card>
        {STAGE_META.map(({ key, icon, accent }, index) => (
          <View key={key} style={[styles.row, index === STAGE_META.length - 1 && styles.lastRow]}>
            <View style={[styles.avatar, { backgroundColor: accent }]}>
              <Ionicons name={icon} size={15} color={colors.white} />
            </View>
            <Text style={styles.label}>{t(`settings.manageConsent.stages.${key}`)}</Text>
            <Switch
              value={!!consent?.[key]}
              onValueChange={(value) => setConsentStage(key, value)}
              trackColor={{ false: colors.line, true: colors.pine }}
              thumbColor={colors.white}
            />
          </View>
        ))}
      </Card>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  lastRow: { borderBottomWidth: 0 },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...(I18nManager.isRTL ? { marginLeft: 12 } : { marginRight: 12 }),
  },
  label: { flex: 1, fontSize: 13, fontFamily: fonts.bodySemiBold, color: colors.ink },
});
