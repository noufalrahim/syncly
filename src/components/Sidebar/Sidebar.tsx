import {
  ChevronDown,
  Loader2,
  LogOut,
  PlusIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PRIMARY_SIDEBAR_ITEMS, SECONDARY_SIDEBAR_ITEMS } from "@/constants/index";
import { useReadData } from "@/hooks/useReadData";
import { ProjectType } from "@/types";
import { CollapsibleContentComponent, ProjectForm } from "./components";
import { OrganisationType } from "@/types/OrganisationType";
import { Modal } from "../Modal";
import { useEffect, useState } from "react";
import OrganisationForm from "./components/OrganisationForm";

export default function AppSidebar() {
  const [openModal, setOpenModal] = useState(false);
  const [openOrgModal, setOpenOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganisationType | null>(null);

  const location = useLocation();

  const {
    data: orgData,
    isLoading: orgDataIsLoading,
    refetch: refetchOrgs,
  } = useReadData<OrganisationType[]>("organisation", "/organisations");

  useEffect(() => {
    if (orgData && !selectedOrg) {
      const savedOrgId = localStorage.getItem("orgId");
      const matchingOrg = orgData.find((org) => org.id === savedOrgId);
      if (matchingOrg) {
        setSelectedOrg(matchingOrg);
      } else if (orgData.length > 0) {
        setSelectedOrg(orgData[0]);
        localStorage.setItem("orgId", orgData[0].id);
      }
    }
  }, [orgData, selectedOrg]);

  const {
    data: projectsData,
    isLoading: projectsDataIsLoading,
    refetch: refetchProjectsData,
  } = useReadData<{
    project: ProjectType;
    organisation: OrganisationType;
  }[]>(
    "projects",
    selectedOrg ? `/projects/fields/many?organisationId=${selectedOrg.id}` : ""
  );

  if (orgDataIsLoading || projectsDataIsLoading) {
    return (
      <div className="min-h-screen w-72 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex justify-between items-center flex-row">
          <h1 className="text-2xl font-bold">Syncly</h1>
          <SidebarTrigger />
        </SidebarHeader>

        <SidebarMenu>
          <SidebarMenuItem className="mx-2 rounded-sm hover:bg-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {selectedOrg?.name || "Select Organisation"}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width] bg-white">
                {orgData?.map((record) => (
                  <DropdownMenuItem
                    key={record.id}
                    onClick={() => {
                      localStorage.setItem("orgId", record.id);
                      setSelectedOrg(record);
                    }}
                    className={cn(
                      selectedOrg?.id === record.id && "bg-gray-100 font-medium"
                    )}
                  >
                    {record.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => setOpenOrgModal(true)}
                  className="text-blue-600 hover:bg-blue-100"
                >
                  + Add New Organisation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {PRIMARY_SIDEBAR_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "hover:bg-gray-200",
                        location.pathname === item.url && "bg-gray-200"
                      )}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {selectedOrg && (
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between items-center">
                <p>Projects</p>
                <PlusIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModal(true);
                  }}
                  size={20}
                  className="rounded-md hover:bg-gray-300 cursor-pointer"
                />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {projectsData?.length ? (
                  projectsData.map((record, index) => (
                    <CollapsibleContentComponent
                      key={index}
                      project={record.project}
                      defaultOpen
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 px-3">No projects found</p>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {SECONDARY_SIDEBAR_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem>
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Create Project">
        {selectedOrg && (
          <ProjectForm
            organisationId={selectedOrg.id}
            refetch={refetchProjectsData}
            setOpenModal={setOpenModal}
          />
        )}
      </Modal>

      <Modal isOpen={openOrgModal} onClose={() => setOpenOrgModal(false)} title="Create Organisation">
        <OrganisationForm refetch={refetchOrgs} setOpenModal={setOpenOrgModal} />
      </Modal>
    </>
  );
}
