import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, ChevronDown, Kanban, Table2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { ProjectType } from '@/types';

export interface CollapsibleContentsProps {
  project: ProjectType;
  defaultOpen: boolean;
}

export default function CollapsibleContentComponent ({ project, defaultOpen }: CollapsibleContentsProps){
  
  const { open } = useSidebar();

  const dispatch = useDispatch();

  const menuItems = [
    { condition: true, title: 'Table', url: '/table', icon: <Table2 size={13} /> },
    { condition: true, title: 'Kanban', url: `/${project.id}/kanban`, icon: <Kanban size={13} /> },
    // { condition: project.showMindMap, title: 'MindMap', url: '/mindmap', icon: <BrainCircuitIcon size={13} /> },
    { condition: true, title: 'Calendar', url: '/calendar', icon: <Calendar size={13} /> },
  ];

  return (
    <TooltipProvider>
      <Collapsible className="group/collapsible" defaultOpen={defaultOpen}>
        <SidebarMenuItem className="list-none rounded">
          <SidebarMenuButton>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <CollapsibleTrigger className="flex w-full items-center justify-center rounded px-1 py-1 hover:bg-gray-200">
                  {project.name.length > 15 ? `${project.name.substring(0, 15)}...` : project.name}
                  <ChevronDown size={15} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-black text-white">
                <p>{project.name}</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarMenuSub>
              {menuItems.map(
                (item, index) =>
                  item.condition && (
                    <SidebarMenuSubItem key={index} className="hover:bg-gray-200 rounded-md">
                      <SidebarMenuSubButton>
                        <Link
                          to={item.url}
                          className="flex w-full flex-row items-center gap-2"
                          onClick={() => {
                            dispatch({
                              type: 'project/selected',
                              payload: {
                                id: project.id,
                                name: project.name,
                              },
                            });
                          }}
                        >
                          {item.icon}
                          {open && <span className="text-sm">{item.title}</span>}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ),
              )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </TooltipProvider>
  );
};
