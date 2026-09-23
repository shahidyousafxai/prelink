import { View, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import FieldLabel from '../shared/FieldLabel';
import Chip from '../shared/Chip';

// A single-select row of Chips wired up like a react-hook-form field —
// matches the prototype's `.chip-grid` (used for the Baseline screen's
// sleep-quality / caregiver-support questions). `valueKeys`, when given,
// decouples the stored form value (a stable, untranslated key) from the
// translated `options` labels shown to the user, so a language switch never
// changes an already-selected answer's underlying value.
export default function ChipGroup({ control, name, label, options, valueKeys }) {
  const keys = valueKeys ?? options;

  return (
    <View style={styles.wrap}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={styles.row}>
            {options.map((option, index) => (
              <Chip
                key={keys[index]}
                label={option}
                selected={value === keys[index]}
                onPress={() => onChange(keys[index])}
              />
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
