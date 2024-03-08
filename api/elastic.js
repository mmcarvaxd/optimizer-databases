const elastic = require('@elastic/elasticsearch');
const esb = require('elastic-builder');

function getClient() {
  return new elastic.Client({ node: 'http://localhost:9200' });
}

async function connectClient() {
  const client = getClient();
  try {
    await client.ping();
    return true;
  } catch (error) {
    return false;
  }
}

async function runElasticQuery(query) {
  const client = getClient();
  const isClientConnected = await connectClient();
  
  if (!isClientConnected) {
    console.log('Elasticsearch is not connected');
    return [];
  }

  let exames = await client.search({
      index: 'patients',
      body: query
  })
  await client.close()

  return exames.body.hits.hits.map(hit => hit._source)
}

async function getPatients(patiensFilter) {
  
  const query = esb.requestBodySearch()
  
  let bool = esb.boolQuery()
  query.size(100)
  
  if (patiensFilter.name) {
    bool.must(esb.matchQuery('name_standard', patiensFilter.name))
  }

  if(patiensFilter.cpf) {
    bool.must(esb.termQuery('cpf', patiensFilter.cpf))
    query.query(esb.termQuery('cpf', patiensFilter.cpf))
  }

  if(patiensFilter.age) {
    bool.must(esb.termQuery(`age`, patiensFilter.age))
  }

  if(patiensFilter.birthDate) {
    bool.must(esb.termQuery(`birthDate`, new Date(patiensFilter.birthDate)))
  }
  query.query(bool)

  return await runElasticQuery(query)
}

module.exports = {
  getPatients
}
