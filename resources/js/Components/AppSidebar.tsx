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
} from "@/components/ui/sidebar";
import { LifeBuoy, Send, Settings2 } from "lucide-react";
import { ContractSwitcher } from "./Sidebar/ContractSwitcher";

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <ContractSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contrat</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem key="dashboard">
              <SidebarMenuButton
                asChild
                isActive={route().current("dashboard")}
              >
                <a href={route("dashboard")}>Tableau de bord</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="information">
              <SidebarMenuButton asChild isActive={false}>
                <a href="#">Détails du contrat</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="vacations">
              <SidebarMenuButton asChild isActive={false}>
                <a href="#">Absences</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Paiements</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem key="payments-history">
              <SidebarMenuButton asChild isActive={false}>
                <a href="#">Historique</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="current-month">
              <SidebarMenuButton asChild isActive={route().current("pay")}>
                <a href={route("pay")}>Mois en cours</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="help">
                <SidebarMenuButton asChild size="sm">
                  <a href="#">
                    <LifeBuoy />
                    <span>Obtenir de l'aide</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="feedback">
                <SidebarMenuButton asChild size="sm">
                  <a href="#">
                    <Send />
                    <span>Feedback</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key="settings">
                <SidebarMenuButton asChild size="sm">
                  <a href="#">
                    <Settings2 />
                    <span>Préférences</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
