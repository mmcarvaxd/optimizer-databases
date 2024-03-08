const fakerBr = require('faker-br');
const elastic = require('@elastic/elasticsearch');

const client = new elastic.Client({ node: 'http://localhost:9200' });

async function connectClient() {
  try {
    await client.ping();
    return true;
  } catch (error) {
    return false;
  }
}

async function createIndex() {
  await client.indices.create({
    index: 'patients',
    body: {
      mappings: {
        properties: {
          name_portuguese: { type: 'text', analyzer: 'portuguese'},
          name_standard: { type: 'text', analyzer: 'standard'},
          name_keyword: { type: 'keyword' },
          cpf: { type: 'keyword' },
          birthDate: { type: 'date' },
          gender: { type: 'keyword' },
          email: { type: 'keyword' },
          age: { type: 'integer' },
        }
      }
    }
  });
}

function createPatient() {
  const patientName = fakerBr.name.findName();
  const patientBirthDate = fakerBr.date.between('1950-01-01', '2023-01-01');
  const patientAge = new Date().getFullYear() - patientBirthDate.getFullYear();

  const patient = {
    name_portuguese: patientName,
    name_standard: patientName,
    name_keyword: patientName,
    cpf: fakerBr.br.cpf(),
    birthDate: patientBirthDate,
    age: patientAge,
    email: fakerBr.internet.email(),
    gender: fakerBr.random.arrayElement(['M', 'F']),
  }

  return patient;
}

async function insertData(patients) {
  await client.bulk({
    refresh: true,
    body: patients,
  });
}

async function main() {
  const isConnected = await connectClient();
  
  const array = Array.from({ length: 10000 }, () => createPatient());
  let elastic = array.flatMap(doc => [{ index: { _index: 'patients' } }, doc])

  if (isConnected) {
    await createIndex();
    await insertData(elastic);
  }
}

main();