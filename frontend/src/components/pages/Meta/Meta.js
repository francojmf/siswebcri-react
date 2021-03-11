import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title> {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Bem-vindo à página do SisWebCRI',
  description: 'Sistema Web do Projeto Cadeira de Rodas Infantil',
  keywords: 'cadeira de rodas infantil, inclusão, doação, tecnologia assistiva',
};

export default Meta;
