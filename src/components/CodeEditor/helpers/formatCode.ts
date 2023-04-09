import prettier from 'prettier';
import parser from 'prettier/parser-babel';

const formatCode = (code: string) => {
  const formatted = prettier
    .format(code, {
      parser: 'babel',
      plugins: [parser],
      printWidth: 80,
      useTabs: false,
      semi: true,
      singleQuote: true,
    })
    .replace(/\n$/, '');

  return formatted;
};

export default formatCode;
