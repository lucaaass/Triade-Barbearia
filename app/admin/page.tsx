"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../_components/header";
import { Button } from "../_components/ui/button";
import { useSession } from "next-auth/react";

const Admin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session:", session);

    if (status === "loading") return; // Não faz nada enquanto carrega

    if (!session || !session.user || !session.user.email) {
      console.log("Usuário não está logado ou email não está disponível. Redirecionando para a página inicial.");
      router.push('/');
      return;
    }

    // Verifica se o usuário é admin
    const isAdmin = ["lucasmarques630@gmail.com", "ewerprofissional@gmail.com", "2210727@escolas.anchieta.br"].includes(session.user.email);
    console.log("Is admin:", isAdmin);
    if (!isAdmin) {
      console.log("Usuário não é um administrador. Redirecionando para a página inicial.");
      router.push('/');
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session || !session.user || !session.user.email) {
    console.log("Sessão não está definida ou usuário não está logado ou email não está disponível. Retornando null.");
    return null; // Retorna null se a sessão ainda não estiver definida ou se o email do usuário não estiver disponível
  }

  // Garantir que apenas usuários permitidos vejam o conteúdo
  const isAdmin = ["lucasmarques630@gmail.com", "ewerprofissional@gmail.com", "2210727@escolas.anchieta.br"].includes(session.user.email);
  console.log("Is admin:", isAdmin);
  if (!isAdmin) {
    console.log("Usuário não é um administrador. Retornando null.");
    return null; // Retorna null se o usuário não for permitido (embora o redirecionamento já tenha ocorrido no useEffect)
  }

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
