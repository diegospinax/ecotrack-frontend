import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import UserCardPreview from '@/components/users/UserCardPreview/UserCardPreview';
import WebContainer from '@/components/WebContainer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Area } from '@/model/enumerated/Area';
import { Role } from '@/model/enumerated/Role';
import { PersonRegister } from '@/model/person/PersonRegister';
import { PersonRequest } from '@/model/person/PersonRequest';
import { User } from '@/model/user/User';
import { UserRequest } from '@/model/user/UserRequest';
import { personService } from '@/services/person/personService';
import { userService } from '@/services/person/userService';
import { beautifyText } from '@/utils/text-display';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function EmployeeFormScreen() {
  const avatars = ['https://cdn.jsdelivr.net/gh/alohe/memojis/png/toon_5.png', 'https://cdn.jsdelivr.net/gh/alohe/memojis/png/toon_6.png'];

  const params = useLocalSearchParams();

  const areas = Object.values(Area);

  const router = useRouter();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [role, setRole] = useState<Role>();

  const [name, setName] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [area, setArea] = useState<Area>();
  const [profilePicture, setProfilePicture] = useState<string>(avatars[0]);

  const [userId, setUserId] = useState<number>();
  const [personId, setPersonId] = useState<number>();

  const isEditing = !!params.user;

  const cardBg = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  useEffect(() => {
    if (params.user) {
      const userData = JSON.parse(params.user as string) as User;
      setUserId(userData.id);
      setEmail(userData.email);
      setRole(userData.role);

      setPersonId(userData.person.id);
      setName(userData.person.name);
      setLastname(userData.person.lastname);
      setArea(userData.person.area);
      setProfilePicture(userData.person.profilePicture);
    }
  }, [params.user]);

  useEffect(() => {
    if (!isEditing && name)
      setPassword(name.split(" ")[0].toLowerCase().concat('123'))
  }, [name, isEditing]);

  const handleSubmit = async () => {
    if (!email || !role || !name || !lastname || !area || !profilePicture) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const personRequest: PersonRequest = {
      name,
      lastname,
      area,
      profilePicture
    }

    const userRequest: UserRequest = {
      email,
      role,
      ...((isEditing && password || !isEditing) && {password})
    }

    if (isEditing) {
      await personService.updatePerson(personId!, personRequest);
      await userService.updateUser(userId!, userRequest);

    } else {
      const registerRequest: PersonRegister = {
        user: userRequest,
        person: personRequest
      }

      console.log(registerRequest);


      await personService.createPerson(registerRequest);
    }

    const action = isEditing ? 'actualizado' : 'creado';
    Alert.alert(
      'Empleado guardado',
      `El empleado ${beautifyText(name + "_" + lastname)} ha sido ${action} exitosamente`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backIcon, { color: text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: text }]}>
          {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <WebContainer scrollable maxWidth={800}>
        {/* Avatar */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Avatar</ThemedText>
          <View style={styles.avatarsGrid}>
            {avatars.map((avatar) => (
              <TouchableOpacity
                key={avatar}
                style={[
                  styles.avatarOption,
                  { backgroundColor: cardBg, borderColor: border },
                  profilePicture === avatar && { borderColor: '#4ade80', borderWidth: 2 }
                ]}
                onPress={() => setProfilePicture(avatar)}
              >
                <Image source={{ uri: avatar }}
                  style={styles.avatarImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Información personal */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información personal</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Nombres*</ThemedText>
            <Input
              placeholder="Ej: Juan Esteban"
              value={name}
              onChangeText={setName}
              style={[styles.input, { color: text }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Apellidos *</ThemedText>
            <Input
              placeholder="Ej: Giraldo Ramirez"
              value={lastname}
              onChangeText={setLastname}
              style={[styles.input, { color: text }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email *</ThemedText>
            <Input
              placeholder="empleado@empresa.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { color: text }]}
            />
          </View>

          {isEditing && (<View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Contraseña *</ThemedText>
            <Input
              placeholder="13w*$h3Re"
              value={undefined}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              style={[styles.input, { color: text }]}
            />
          </View>)}

          <View style={[styles.inputGroup,]}>
            <ThemedText style={[styles.inputLabel]}>Role *</ThemedText>
            <View style={{
              flexDirection: 'row',
              gap: 10,
            }}>
              <TouchableOpacity
                style={[
                  styles.areaOption,
                  { backgroundColor: cardBg, borderColor: border },
                  role === 'ADMIN' && { borderColor: '#4ade80', borderWidth: 2 }
                ]}
                onPress={() => setRole(Role.ADMIN)}
              >
                <ThemedText>Administrador</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.areaOption,
                  { backgroundColor: cardBg, borderColor: border },
                  role === 'USER' && { borderColor: '#4ade80', borderWidth: 2 }
                ]}
                onPress={() => setRole(Role.USER)} >
                <ThemedText>Empleado</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Información laboral */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Información laboral</ThemedText>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Área *</ThemedText>
            <View style={styles.areasFlex}>
              {areas.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.areaOption,
                    { backgroundColor: cardBg, borderColor: border },
                    area === value && { borderColor: '#4ade80', borderWidth: 2 }
                  ]}
                  onPress={() => setArea(value)}
                >
                  <ThemedText style={styles.areaOptionText}>{beautifyText(value)}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Vista previa */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Vista previa</ThemedText>
          <UserCardPreview
            user={{
              email,
              role
            }}
            person={{
              area,
              lastname,
              name,
              profilePicture
            }} />
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            label={isEditing ? 'Actualizar empleado' : 'Crear empleado'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
          <Button
            label="Cancelar"
            variant="secondary"
            onPress={() => router.back()}
            style={styles.cancelButton}
          />
        </View>
      </WebContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  backIcon: { fontSize: 24 },
  title: { fontSize: 20, fontWeight: '700' },
  content: { flex: 1 },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
    ...(Platform.OS === 'web' && {
      paddingHorizontal: 0,
    }),
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    ...(Platform.OS === 'web' && {
      justifyContent: 'center',
    }),
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 55,
    height: 55,
    borderRadius: 30
  },
  avatarText: { fontSize: 24 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: { marginBottom: 4 },
  areasFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  areaOption: {
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    width: '48%',
  },
  areaOptionText: { fontSize: 14, fontWeight: '500' },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12
  },
  submitButton: { marginBottom: 8 },
  cancelButton: { marginBottom: 8 },
});





