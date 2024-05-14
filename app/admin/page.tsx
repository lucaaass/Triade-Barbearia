"use client";
import { useRouter } from 'next/navigation';
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { useSession } from "next-auth/react";

const Admin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session || !session.user) {
    router.push('/');
    return null;
  }

  // Verifica se o usuário está autenticado e se é o usuário "Lucas Marques"
  const isLucasMarques = session.user.email === "lucasmarques630@gmail.com" || session.user.email === "ewerprofissional@gmail.com" ;

  // Se o usuário autenticado não for "Lucas Marques", redireciona para a página inicial
  if (!isLucasMarques) {
    router.push('/');
    return null;
  }

  // Se o usuário autenticado for "Lucas Marques", renderiza a página de administração
  const handleClickConfirmados = () => {
    router.push('/admin/confirmados');
  };

  const handleClickFinalizados = () => {
    router.push('/admin/finalizados');
  };

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="px-2 pb-3">
        <Button onClick={handleClickConfirmados} className="w-full mt-3" variant="secondary">Confirmados</Button>
        <Button onClick={handleClickFinalizados} className="w-full mt-3" variant="secondary">Finalizados</Button>
      </div>
    </div>
  );
}

export default Admin;
