import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import { ThemeSwitcher } from '@teambit/design.themes.theme-toggler';
// import { Header } from '@teambit/wiki.blocks.header';
// import { WideColumn } from '@teambit/base-ui.layout.page-frame';
// import { Footer } from '@teambit/wiki.blocks.footer';
// import { Wiki } from '@teambit/wiki.sections.wiki';
import { ThemeSwitch } from '../theme-switch'
import { Switch } from './switch';
import style from './trans.scss'
import classNames from 'classnames'

const paddingLeftRight = '20px'

export function WikiApp() {
  return (
    <ThemeSwitch initialTheme="dark" style={{
      paddingLeft: paddingLeftRight,
      paddingRight: paddingLeftRight,
      transition: '1s'
    }}>

      {/* header component
      <Header />

      <WideColumn>
        
        <Routes>
          <Route path="/" element={<Wiki />} />
        </Routes>

        <Footer />
      </WideColumn> */}

      <h1 className={classNames(style.trans)}>My Components</h1>
      <Switch></Switch>

    </ThemeSwitch>

  );
}
