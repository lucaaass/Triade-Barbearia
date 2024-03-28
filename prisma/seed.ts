const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/018d8a4c-6528-449f-a589-29f63cdf6e51-ft14px.png",

    ];
    // Nomes da  barbearia
    const triadeBarber = [
      "Tríade Barbearia",

    ];

    // Endereços da barbearia
    const addresses = [
      "Rua Augusta Teixeira Rodrigues, 4044 ",
    ];



    const services = [
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

    ];

    // Criar barbearia com nomes e endereço e imagem
    const barbershops = [];
    for (let i = 0; i < 2; i++) {
      const name = triadeBarber[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });



      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
          },

        });
      }

      barbershops.push(barbershop);
    }



    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }

  try {
    // mexi aqui


    const partnersImages = [

      "https://utfs.io/f/198084e2-54e9-4bcf-8c75-eb511bc3d820-jvkbri.jpeg",
      "https://utfs.io/f/23a5a392-9078-4510-9397-f2b8d093c9c8-jvkbsd.jpeg",
      "https://utfs.io/f/a9f1a215-e59a-4f6c-8344-23a3b877e63a-itrtgb.01.08.jpeg",
      "https://utfs.io/f/55ebaa86-57e3-46de-858e-d92c7311806f-itrtgb.01.07.jpeg",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",

    ];
    // Nomes para os parceiros
    const partnersName = [
      "MB Lanches",
      "Assistec Edu",
      "Cílios e Beleza As",
      "Ousadia",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",

    ];

    // Endereços fictícios para as barbearias
    const partnersAddress = [

      "Av. Presbítero Manoel Antônio dias filho, 954",
      "Av. José Benedito Constatino Rosa, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
    ];


   
    const partners = [];
    for (let i = 0; i < 10; i++) {
      const name = partnersName[i];
      const address = partnersAddress[i];
      const imageUrl = partnersImages[i];


      const partner = await prisma.partner.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

    
      partners.push(partner);

      console.log("Parceiro criado com sucesso:", partner);

    }
    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar aos parceiros:", error);
  }


}

seedDatabase();