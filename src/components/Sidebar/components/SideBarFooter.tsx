import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';
import { loggedInUser } from '@/constants';
const SideBarFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                {loggedInUser.image ? <img src={loggedInUser.image} alt={loggedInUser.name} className="h-6 w-6 rounded-full" /> : <User2 className="h-8 w-8 rounded-full" />}
                {loggedInUser.name}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem
                onClick={() => {
                  console.log('Account');
                }}
              >
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SideBarFooter;
