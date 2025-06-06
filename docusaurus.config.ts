// docusaurus.config.ts

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'I Love Sia Site', // 이전 설정 유지
  tagline: '찌봉찌봉 찌찌봉', // 이전 설정 유지
  favicon: 'img/favicon.ico',

  // !! 중요: 아래 5가지 배포 관련 설정을 최종 수정했습니다 !!
  // ---------------------------------------------------------
  url: 'https://ILoveSia.github.io',   // <-- 실제 닉네임으로 수정
  baseUrl: '/myDoc/',
  organizationName: 'ILoveSia',        // <-- 실제 닉네임으로 수정
  projectName: 'myDoc',
  deploymentBranch: 'gh-pages',
  // ---------------------------------------------------------

  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // 'Edit this page' 링크를 실제 저장소로 변경
          editUrl: 'https://github.com/ILoveSia/myDoc/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // 'Edit this page' 링크를 실제 저장소로 변경
          editUrl: 'https://github.com/ILoveSia/myDoc/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ]	
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
          // 상단 GitHub 링크를 실제 저장소로 변경
          href: 'https://github.com/ILoveSia/myDoc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [ /* 생략 */ ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;