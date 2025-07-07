// docusaurus.config.ts

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'I Love Oh Sia Site',
  tagline: '찌봉찌봉 찌찌봉',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ILoveSia.github.io',
  baseUrl: '/myDoc/',
  
  // GitHub pages deployment config.
  organizationName: 'ILoveSia', // <-- 사용자 이름 통일
  projectName: 'myDoc',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko', // <-- 한국어로 변경
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // 'Edit this page' 링크를 로코님 저장소로 변경
          editUrl: 'https://github.com/ILoveSia/myDoc/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // 'Edit this page' 링크를 로코님 저장소로 변경
          editUrl: 'https://github.com/ILoveSia/myDoc/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ] satisfies Preset.Options,
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          // 상단 GitHub 링크를 로코님 저장소로 변경
          href: 'https://github.com/ILoveSia/myDoc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // ... (이 부분은 그대로 두셔도 좋습니다) ...
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;