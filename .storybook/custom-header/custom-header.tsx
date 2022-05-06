import React, {PureComponent} from 'react';
import * as client from 'react-dom/client';
import jetbrainsLogo from '@jetbrains/logos/jetbrains/jetbrains.svg';
import gitHubLogo from '@primer/octicons/build/svg/mark-github-16.svg';

import {setClient} from '../../src/global/react-render-adapter';
import packageInfo from '../../package.json';
import Auth from '../../src/auth/auth';
import IFrameFlow from '../../src/auth/iframe-flow';
import Header, {
  Tray,
  TrayIcon,
  Logo,
  SmartProfile,
  Services
} from '../../src/header/header';
import hubConfig from '../hub-config';
import authDialogService from '../../src/auth-dialog-service/auth-dialog-service';

import Version from './version';
import styles from './header-styles.css';


/* eslint-disable import/no-unresolved */
import teamcityLogo from '!file-loader?publicPath=./!@jetbrains/logos/teamcity/teamcity.svg';
import upsourceLogo from '!file-loader?publicPath=./!@jetbrains/logos/upsource/upsource.svg';
import youtrackLogo from '!file-loader?publicPath=./!@jetbrains/logos/youtrack/youtrack.svg';
/* eslint-enable */

setClient(client);

class SiteHeader extends PureComponent {
  async componentDidMount() {
    const noAuth = window.location.hostname !== 'jetbrains.github.io';

    if (!noAuth) {
      this.auth.setAuthDialogService(authDialogService);
      const restoreLocation = await this.auth.init();
      if (restoreLocation && window.location.href !== restoreLocation) {
        window.location.href = restoreLocation;
      }
      this.auth.loadCurrentService();
    }
  }

  auth = new Auth({
    ...hubConfig,
    EmbeddedLoginFlow: IFrameFlow
  });

  render() {
    return (
      <Header className={styles.header}>
        <a href=".">
          <Logo
            className={styles.logo}
            glyph={jetbrainsLogo}
            size={Logo.Size.Size96}
          />
        </a>

        <span className={styles.headerItem}>
          {'Version '}
          <Version version={packageInfo.version}/>
        </span>

        <Tray>
          <TrayIcon
            icon={gitHubLogo}
            iconSize={24}
            iconSuppressSizeWarning
            href="https://github.com/JetBrains/ring-ui"
            target="_blank"
            title="GitHub repo"
            aria-label="GitHub repo"
            className={styles.githubIcon}
          />

          <Services
            services={[
              {
                id: 'youtrack',
                name: 'Issues',
                iconUrl: youtrackLogo,
                homeUrl: 'https://youtrack.jetbrains.com/issues/RG'
              },
              {
                id: 'upsource',
                name: 'Code review',
                iconUrl: upsourceLogo,
                homeUrl: 'https://upsource.jetbrains.com/ring-ui/view'
              },
              {
                id: 'teamcity',
                name: 'Builds',
                iconUrl: teamcityLogo,
                homeUrl: 'https://teamcity.jetbrains.com/project.html?projectId=JetBrainsUi_RingUi&tab=projectOverview'
              }
            ]}
          />
          <SmartProfile auth={this.auth}/>
        </Tray>
      </Header>
    );
  }
}

const node = document.createElement('div');
const root = client.createRoot(node);
root.render(<SiteHeader/>);
document.body.insertAdjacentElement('afterbegin', node);
