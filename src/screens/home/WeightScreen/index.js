import { useTranslation } from 'react-i18next';

import UnavailablePillarScreen from '../../../components/UnavailablePillarScreen';

export default function WeightScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <UnavailablePillarScreen
      headline={t('home.weight.headline')}
      sub={t('home.weight.sub')}
      backLabel={t('common.back.today')}
      onBack={() => navigation.navigate('Main', { screen: 'Today' })}
    />
  );
}
