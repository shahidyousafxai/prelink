import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import FieldLabel from './FieldLabel';
import Chip from './Chip';

// A single-select row of Chips wired up like a react-hook-form field —
// matches the prototype's `.chip-grid` (used for the Baseline screen's
// sleep-quality / caregiver-support questions).
export default function ChipGroup({ control, name, label, options }) {
  return (
    <View style={styles.wrap}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.row}>
            {options.map((option) => (
              <Chip key={option} label={option} selected={value === option} onPress={() => onChange(option)} />
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 20 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
