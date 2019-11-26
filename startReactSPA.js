const fs = require('fs')
const path = require('path')

const folders =[
    './src', './dist', './src/app', './src/app/components',
    './src/app/layouts', './src/app/pages', './src/app/styles',
    './src/app/img', './src/app/html',
]
const files = [
{name: './src/index.js', content:
`import React from 'react'\nimport ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory} from 'react-router'\n
import './app/styles/style.css'\nimport 'bootstrap/dist/css/bootstrap.min.css'\n
import Layout from './app/layouts/Layout'
import About from './app/pages/About'
import Main from './app/pages/Main'
import PageNotFound from './app/pages/PageNotFound'\n
ReactDOM.render(<Router history={ browserHistory }>
    <Route path='/' component={ Layout }>
        <IndexRoute component={ Main } />
        <Route path='about' component={ About }/>
        <Route path='*' component={ PageNotFound }/>
    </Route>
</Router>, document.querySelector('#root'))`,},
//===============================================================
{name: './src/app/html/index.html', content:`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>new SPA application</title>
    <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon">
</head>
<body>
    <div class="container-main" id="root">
    </div>
</body>
</html>`,},
//===============================================================
    {name: './webpack.config.js', content:
    `const path = require("path")
const HtmlWebpackPlugin = require ('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
    },
    mode: "development",
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader"
            },
            {   //css
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
            },
            {   //static files
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                    name: '[name].[ext]'
                },
            },
            { 
            test: /\.html$/,
            use: { loader: 'html-loader' }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/app/html/index.html",
            filename: "index.html",
            excludeChunks: ['server']
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    }
}`,},
//===============================================================
    {name: './.babelrc', content:
    `{
        "presets": ["@babel/preset-react", "@babel/preset-env"]
    }`,},
//===============================================================
    {name: './src/app/layouts/Layout.js', content:
`import React, { Component } from 'react'
import Menu from '../components/Menu'
import Footer from '../components/Footer'\n\n
export default class Layout extends Component {
    constructor(props) {
        super(props)
        this.logo = '../img/logo.png'
        this.menuItems = [
            { href: '/', title: 'Main'},
            { href: '/about', title: 'About us'},
        ]
    }\n
    render() {
        return (
            <div>
                <Menu items = { this.menuItems } logo = { this.logo }/>
                <div className=''>
                    <div className=''>
                        {this.props.children}
                    </div>
                </div>
                <Footer /> 
            </div>
        )
    }
}`,},
//===============================================================
    {name: './src/app/components/Menu.js', content: 
`import React from 'react'
import MenuItem from './MenuItem'
import { Link } from 'react-router'\n
export default class Menu extends React.Component {
    constructor(props) {
        super(props)
    }\n
    isActive(href) {
        /[-0-9]+/.test(window.location.pathname) ? 
            href+='/'+window.location.pathname.match(/[-0-9]+/)[0] : href
        return window.location.pathname === href
    }\n
    render() {
        const items = this.props.items.map((item, index) => 
            <MenuItem key={index} href={item.href}
            active={ this.isActive(item.href) }>{item.title}</MenuItem>)
        
        return (
            <div className=''>
                <Link to="/"><img src={this.props.logo} className=''  height={50} alt='Company logo'></img></Link>
                <nav className=' '>
                    <ul className=''> {items} </ul>
                </nav>
            </div>
        )
    }
}`,},
//===============================================================
    {name: './src/app/components/MenuItem.js', content: 
`import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'\n
export default class MenuItem extends React.Component {
    render() {
        return (
            <li className=''>
                <Link to={this.props.href} className={ this.props.active? 'active':''}>
                    {this.props.children}
                </Link>
            </li>
        )
    }
}\n
MenuItem.propTypes = {
    children: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
}`,},
//===============================================================
    {name: './package.json', content:
`{
"name": "simplespaapplication",
"version": "1.0.0",
"description": "Small page with simple SPA application using ReactJS",
"main": "index.js",
"scripts": {
    "dev": "webpack",
    "build": "webpack --mode production",
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open"
},

"author": "",
"license": "ISC",

"dependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "@babel/preset-react": "^7.0.0",
    "@std/esm": "^0.26.0",
    "axios": "^0.19.0",
    "babel-loader": "^8.0.6",
    "bootstrap": "^4.3.1",
    "css-loader": "^3.2.0",
    "esm": "^3.2.25",
    "file-loader": "^4.2.0",
    "fsevents": "^2.1.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "jquery": "^3.4.1",
    "prop-types": "^15.7.2",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-router": "^3.2.5",
    "style-loader": "^1.0.0",
    "webpack": "^4.39.3",
    "webpack-dev-server": "^3.9.0"
},
"devDependencies": {
    "webpack-cli": "^3.3.8"
}
}`,},
//===============================================================
    {name: './.gitignore', content: `node_modules/`,},
//===============================================================
    {name: './src/app/styles/style.css', content:
`* {
    padding: 0;
    margin: 0;
}

.txt-center {
    text-align: center;
}`,},
//===============================================================
    {name: './src/app/components/Footer.js', content:
`import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className=''>
            </div>
        )
    }
}`,},
//===============================================================
    {name: './src/app/pages/PageNotFound.js', content: 
`import React, { Component } from 'react'

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
            <h1>Page not found!!!</h1>
            <p>Warning!! Error 404!!!</p>
            </div>
        )
    }
}`,},
//===============================================================
    {name: './src/app/pages/Main.js', content: 
`import React, { Component } from 'react'

export default class Main extends Component {
    render() {
        return (
            <div>
                <h1>Main page</h1>
            </div>
        )
    }
}`,},
//===============================================================
    {name: './src/app/pages/About.js', content: 
`import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
                <h1>About us</h1>
            </div>
        )
    }
}`,},
]

folders.forEach( val => {
    try {!fs.existsSync(val) && fs.mkdirSync(path.normalize(val))}
    catch (err) { console.error(err) }
})
files.forEach( val => {
    fs.closeSync(fs.openSync(val.name, 'w'))
    fs.writeFile(val.name,val.content, err => { err && console.log(err); return })
})