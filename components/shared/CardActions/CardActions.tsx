import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './CardActions.styles';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardActions({ onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3b82f6' }]}
        onPress={onEdit}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ef4444' }]}
        onPress={onDelete}
      >
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}