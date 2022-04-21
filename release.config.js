module.exports = {
    branches: [
        'main',
        'next'
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                'changelogFile': 'CHANGELOG.md'
            }
        ],
        '@semantic-release/npm',
        [
            '@semantic-release/github',
            {
                'assets': [
                    {
                        'path': 'index.js',
                        'label': 'Alphanumeric-Encoder'
                    },
                    {
                        'path': 'API.md',
                        'label': 'API'
                    }
                ]
            }
        ],
        [
            '@semantic-release/git',
            {
                'assets': [
                    'index.js',
                    'README.md',
                    'API.md',
                    'CHANGELOG.md',
                    'LICENSE',
                    'package.json',
                    'package-lock.json'
                ],
                'message': 'build(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ]
    ],
    preset: 'angular'
}