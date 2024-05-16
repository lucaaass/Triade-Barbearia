import { signIn, signOut, useSession } from "next-auth/react";

import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon,LockKeyhole , LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {
  const { data } = useSession();
  // const router = useRouter();

  const handleLogoutClick = () => signOut();

  const handleLoginClick = () => signIn("google");

  // Verifica se o usuário está autenticado e se o nome de usuário é "Lucas"
  const isAdmin = data?.user?.email === "2210727@escolas.anchieta.br" || data?.user?.email === "lucasmarques630@gmail.com" || data?.user?.email === "ewerprofissional@gmail.com" ;
  console.log("Session data:", data); // Adiciona um log dos dados da sessão
  console.log("User email:", data?.user?.email); // Adiciona um log do nome do usuário


  if (!data) {
    return (
      // Componente de menu para usuários não autenticados
      <>
        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2">
            <UserIcon size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button variant="secondary" className="w-full justify-start" onClick={handleLoginClick}>
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      </>
    );
    
  }

  

  // Componente de menu para usuários autenticados
  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex justify-between px-5 py-6 items-center">
        <div className="flex items-center gap-3">
          
          <Avatar>
            <AvatarImage src={data.user?.image ?? ""} />
          </Avatar>

          <h2 className="font-bold">{data.user?.name}</h2>
        </div>

        <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
          <LogOutIcon />
        </Button>
      </div>

    

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        <Button variant="outline" className="justify-start" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} className="mr-2" />
            Agendamentos
          </Link>
        </Button>
        {isAdmin && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/admin">
              <LockKeyhole size={18} className="mr-2" />
              Administrador
            </Link>
          </Button>
        
      )}
      </div>
    </>
  );
};

export default SideMenu;