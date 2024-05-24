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
            price: 45.0,
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
        name: "Gama tattoo",
        address: "Av. Eunice Cavalcante de Souza Queiroz, 822 - Parque Res. Jundiaí,",
        addressLink:"https://www.google.com.br/maps/place/Gama+tattoo+-+Realismo/@-23.1485786,-47.0099585,17z/data=!3m1!4b1!4m6!3m5!1s0x94cf279b77659c23:0x4d87f2a818af4278!8m2!3d-23.1485786!4d-47.0073836!16s%2Fg%2F11t2r77s71?entry=ttu",
        imageUrl: "https://utfs.io/f/83ff9be0-4658-4a1e-84db-53151007a760-wzrtqd.jpeg",
        tel: "(11)94235-0984",
        whatsapp:"https://api.whatsapp.com/send?phone=5511942350984&text=Olá,Gostaria de saber mais informações!",
       insta: "@Gamatattoo",
       instaLink:"https://www.instagram.com/gamatattoo/",
       },
      {
        name: "MB Lanches",
        address: "Av. Presbítero Manoel Antônio dias filho, 954",
        addressLink:"https://www.google.com/maps/place/Av.+Presb%C3%ADtero+Manoel+Ant%C3%B4nio+Dias+Filho,+954+-+Parque+Res.+Jundia%C3%AD,+Jundia%C3%AD+-+SP,+13212-461/@-23.1455633,-47.0113602,17z/data=!3m1!4b1!4m6!3m5!1s0x94cf304de416062d:0x329ea984af11a4ba!8m2!3d-23.1455633!4d-47.0087853!16s%2Fg%2F11f1mv2l71?entry=ttu",
        imageUrl: "https://utfs.io/f/198084e2-54e9-4bcf-8c75-eb511bc3d820-jvkbri.jpeg",
        tel: "(11)97212-5096",
        whatsapp:"https://api.whatsapp.com/send?phone=5511972125096&text=Olá,Gostaria de fazer um pedido!",
        insta: "@MB lanches",
        instaLink:"https://www.instagram.com/mblanches_02/",
      },
      {
        name: "Assistec Edu",
        address: "Av. José Benedito Constatino Rosa, 789",
        addressLink:"não informado",
        imageUrl: "https://utfs.io/f/23a5a392-9078-4510-9397-f2b8d093c9c8-jvkbsd.jpeg",
        tel: "Não informado",
        whatsapp: "Não informado",
        insta: "Não informado",
        instaLink:"Não informado",
      },
      {
        name: "Cílios e Beleza As",
        address: "Não informado",
        addressLink: "Não informado",
        imageUrl: "https://utfs.io/f/a9f1a215-e59a-4f6c-8344-23a3b877e63a-itrtgb.01.08.jpeg",
        tel: "Não informado",
        whatsapp: "Não informado",
        insta: "Não informado",
        instaLink: "Não informado",
      },
      {
        name: "Ousadia",
        address: "Não informado",
        addressLink: "Não informado",
        imageUrl: "https://utfs.io/f/55ebaa86-57e3-46de-858e-d92c7311806f-itrtgb.01.07.jpeg",
        tel: "Não informado",
        whatsapp: "Não informado",
        insta: "Não informado",
        instaLink: "Não informado",
      },
     
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
      for (const { name, address, addressLink, imageUrl, tel, whatsapp, insta, instaLink } of partnersData) {
        const partner = await prisma.partner.create({
          data: {
            name,
            address,
            addressLink,
            imageUrl,
            tel,
            whatsapp,
            insta,
            instaLink,
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
