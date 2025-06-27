import { AppBar } from "@/components/AppBar";
import SettingsOverview from "./SettingsOverview";
import SettingsPeopleList from "./SettingsPeopleList";

export default function ProjectSettings() {
  return (
    <div className="h-screen w-full flex flex-col">
      <AppBar title="Web Development" description="Manage your project here" />
      <div className="flex-1 p-6 overflow-hidden">
        <div className="border-t border-dashed border-gray-300 p-5 gap-10 flex flex-col">
          <SettingsOverview />
          <SettingsPeopleList />
        </div>
      </div>
    </div>
  );
}
