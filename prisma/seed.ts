const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Dados das barbearias
    const barbershopsData = [
      {
        name: "Tríade Barbearia",
        address: "Rua Augusta Teixeira Rodrigues, 4044",
        imageUrl: "https://utfs.io/f/018d8a4c-6528-449f-a589-29f63cdf6e51-ft14px.png",
        services: [
          {
            name: "Corte de Cabelo",
            description: "Estilo personalizado com as últimas tendências.",
            price: 25.0,
            imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
          },
          {
            name: "Cabelo e Barba",
            description: "Modelagem completa para destacar sua masculinidade.",
            price: 30.0,
            imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
          },
          {
            name: "Navalhado",
            description: "Acabamento perfeito para um visual renovado.",
            price: 35.0,
            imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
          },
          {
            name: "Barba",
            description: "Expressão acentuada com modelagem precisa.",
            price: 20.0,
            imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
          },
        ],
      },
      // Adicione mais dados de barbearias conforme necessário
    ];

    // Dados dos parceiros
    const partnersData = [
      {
        name: "MB Lanches",
        address: "Av. Presbítero Manoel Antônio dias filho, 954",
        imageUrl: "https://utfs.io/f/198084e2-54e9-4bcf-8c75-eb511bc3d820-jvkbri.jpeg",
        tel: "(11)97212-5096",
        insta: "@MB lanches",
      },
      {
        name: "Assistec Edu",
        address: "Av. José Benedito Constatino Rosa, 789",
        imageUrl: "https://utfs.io/f/23a5a392-9078-4510-9397-f2b8d093c9c8-jvkbsd.jpeg",
        tel: "Não informado",
        insta: "Não informado",
      },
      {
        name: "Cílios e Beleza As",
        address: "Não informado",
        imageUrl: "https://utfs.io/f/a9f1a215-e59a-4f6c-8344-23a3b877e63a-itrtgb.01.08.jpeg",
        tel: "Não informado",
        insta: "Não informado",
      },
      {
        name: "Ousadia",
        address: "Não informado",
        imageUrl: "https://utfs.io/f/55ebaa86-57e3-46de-858e-d92c7311806f-itrtgb.01.07.jpeg",
        tel: "Não informado",
        insta: "Não informado",
      },
      // {
      //   name: "Cabelo & Cia.",
      //   address: "Estrada do Machado, 303",
      //   imageUrl: "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      //   tel: "(11)974747474",
      //   insta: "@instagram",
      // },
      // {
      //   name: "Machado & Tesoura",
      //   address: "Avenida Elegante, 404",
      //   imageUrl: "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      //   tel: "(11)974747474",
      //   insta: "@instagram",
      // },
      // {
      //   name: "Barbearia Elegance",
      //   address: "Avenida Elegante, 404",
      //   imageUrl: "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      //   tel: "(11)974747474",
      //   insta: "@instagram",
      // },
      // Adicione mais dados de parceiros conforme necessário
    ];
    // Iniciar transação
    await prisma.$transaction(async (prisma:any) => {
      // Inserir dados das barbearias
      for (const { name, address, imageUrl, services } of barbershopsData) {
        const barbershop = await prisma.barbershop.create({
          data: {
            name,
            address,
            imageUrl,
            services: {
              createMany: {
                data: services.map((service) => ({
                  name: service.name,
                  description: service.description,
                  price: service.price,
                  imageUrl: service.imageUrl,
                })),
              },
            },
          },
        });
        console.log("Barbearia criada com sucesso:", barbershop);
      }

      // Inserir dados dos parceiros
      for (const { name, address, imageUrl, tel, insta } of partnersData) {
        const partner = await prisma.partner.create({
          data: {
            name,
            address,
            imageUrl,
            tel,
            insta,
          },
        });
        console.log("Parceiro criado com sucesso:", partner);
      }
    });

    console.log("Dados inseridos com sucesso!");

    // Verificar se os dados foram inseridos corretamente
    const allBarbershops = await prisma.barbershop.findMany();
    const allPartners = await prisma.partner.findMany();
    console.log("Todas as barbearias:", allBarbershops);
    console.log("Todos os parceiros:", allPartners);

  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  } finally {
    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  }
}

seedDatabase();
