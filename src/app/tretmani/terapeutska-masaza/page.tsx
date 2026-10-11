import { StranicaTretmana, metadataStranice } from "@/components/StranicaTretmana";

export const metadata = metadataStranice("terapeutska-masaza");

export default function Stranica() {
  return <StranicaTretmana slug="terapeutska-masaza" />;
}
