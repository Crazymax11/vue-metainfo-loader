/* eslint-env jest */
const loader = require('./loader.js');

describe('loader', () => {
  it('should be a function', () => {
    expect(typeof loader).toEqual('function');
  });

  it('should extract component name from filename, when resourcePath is filename', () => {
    expect(
      loader.call(
        {
          resourcePath: 'componentName.vue',
        },
        `<script>export default {}</script>`,
      ),
    ).toMatchSnapshot();
  });

  it('should extract component name from filename, when resourcePath is absolute path', () => {
    expect(
      loader.call(
        {
          resourcePath: '/data/path/componentName.vue',
        },
        `<script>export default {}</script>`,
      ),
    ).toMatchSnapshot();
  });

  it('should console error and return code as is if error occurs', () => {
    const oldError = console.error;
    const oldWarn = console.warn;

    const errorSpy = jest.fn();
    const warnSpy = jest.fn();
    console.error = errorSpy;
    console.warn = warnSpy;

    const result = loader.call(
      {
        resourcePath: 'componentName',
      },
      'export default {}',
    );
    console.error = oldError;
    console.warn = oldWarn;

    expect(result).toEqual('export default {}');
    expect(warnSpy).toHaveBeenCalledWith(
      'vue-metainfo-loader: Error has occured while processing componentName: Unexpected token (1:0)',
    );
    expect(errorSpy.mock.calls[0][0].message).toEqual('Unexpected token (1:0)');
  });

  it('should not crash component if it already has name or meta', () => {
    expect(
      loader.call(
        {
          resourcePath: 'componentName.vue',
        },
        `<script>export default {name: 'test', meta: 'test2'}</script>`,
      ),
    ).toMatchSnapshot();
  });
});
