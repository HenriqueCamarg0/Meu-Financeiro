import { Stack } from 'expo-router';
import { HeaderFinanceiro } from '../components/header';

export default function Layout() {
  return <Stack screenOptions={{ headerTitle: "Controle Financeiro" }} />;
}