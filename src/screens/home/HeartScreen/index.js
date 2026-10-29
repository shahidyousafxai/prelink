import { useTranslation } from 'react-i18next';

import UnavailablePillarScreen from '../../../components/UnavailablePillarScreen';

export default function HeartScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <UnavailablePillarScreen
      headline={t('home.heart.headline')}
      sub={t('home.heart.sub')}
      backLabel={t('common.back.today')}
      onBack={() => navigation.navigate('Main', { screen: 'Today' })}
    />
  );
}
