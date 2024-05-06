import commonjs from 'rollup-plugin-commonjs'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'


//https://github.com/zambezi/ez-build/blob/d7f110b3cf136a3a6905d1c3723104a74ca1e5b8/src/builder/css.js#L17
//https://github.com/niksy/css-loader/blob/0c8a23b48521656d8f2ea4c14108b44882ecb0f2/src/plugins/postcss-url-parser.js#L107
//https://github.com/shipshapecode/tether/blob/7d1037fe100b661f4a1767e2981e5fc2305b7b51/rollup.config.js#L43
//explanations
//https://github.com/starzje/rollup_example/blob/62d146e10c941cbfeaec558f2f18efbd7ce958d5/rollup.config.mjs#L24
//https://github.com/niklasgrewe/apple-svelte-demo/blob/9513ccda19e881010cbde46c6877445f387fdb48/rollup.config.js#L23
import postcss from 'postcss';
import postcssPlugin  from 'rollup-plugin-postcss'

import packageJson from './package.json'

import autoprefixer from 'autoprefixer';
import resolve from 'rollup-plugin-node-resolve';

import mkdirp from 'mkdirp';
import {writeFileSync} from 'fs';
import sass from 'rollup-plugin-sass'
import cssnano from 'cssnano';
import license from 'rollup-plugin-license';
const buildFormats = ['cjs', 'es','umd'] // include others if needed

const banner = ['/*!', packageJson.name, packageJson.version, '*/\n'].join(' ');


 const postcssPlugins = [
    autoprefixer({
      grid: false
    })
  ];
const sassOptions = {
	
	output(styles, styleNodes) {
		var dir = './dist/css';
		

		dir.split('/').reduce(
			(directories, directory) => {
			directories += `${directory}/`;

			if (!fs.existsSync(directories)) {
			fs.mkdirSync(directories);
			}

			return directories;
			},
			'',
		);

		

		styleNodes.forEach(({ id, content }) => {		
			const fileNameWithExt = path.basename(id);		
			const scssName = fileNameWithExt;
			const name = scssName.split('.')[0];
			fs.writeFileSync(`dist/css/${name}.css`, content);
		});
	},
	processor: css => postcss(postcssPlugins)
    .process(css,{
        from: './src/**'
      })
    .then(result => result.css)
};



const plugins = [
  resolve(),
  commonjs(), 
     license({
      banner
    }),
];
plugins.push(sass(sassOptions));


const config = [{
	 
	input: 'src/index.scss',
	output: [{
		file:'dist/introjs.css',
		name:'myDemo',
		format: 'cjs',
		//exports: 'named',
		//sourcemap: true,
        //inlineDynamicImports: true,
	}/*, {
		file: 'dist/introjs.min.css',
		format: 'es',
		  exports: 'named',
		 sourcemap: true,
                inlineDynamicImports: true,
	}
	*/],
	plugins
 
}]
 
export default config