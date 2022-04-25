module.exports = {
    branches: [
        'main',
        'next'
    ],
    plugins: [
        ['@semantic-release/commit-analyzer', {
            'preset': 'angular',
            'releaseRules': [
                {'type': 'build', 'release': 'patch'},
                {'scope': 'api', 'release': 'patch'},
                {'scope': 'license', 'release': 'patch'}
            ]
        }],
        [
            '@semantic-release/release-notes-generator', {
                'preset': 'conventionalcommits',
                'presetConfig': {
                    'types': [
                        {'type': 'build', 'section': ':building_construction: Build Changes', 'hidden': false},
                        {'type': 'ci', 'hidden': true},
                        {'type': 'docs', 'hidden': true},
                        {'type': 'feat', 'section': ':gift: Feature Changes', 'hidden': false},
                        {'type': 'fix', 'section': ':lady_beetle: Bug Fixes', 'hidden': false},
                        {'type': 'perf', 'section': ':fast_forward: Performance Improvements', 'hidden': false},
                        {'type': 'refactor', 'hidden': true},
                        {'type': 'test', 'section': ':dart: Test Changes', 'hidden': false}
                    ]
                },
                'writerOpts': {
                    'commitsSort': ['subject', 'scope']
                }
            }
        ],
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
                    'CONTRIBUTING.md',
                    'LICENSE',
                    'package.json',
                    'package-lock.json'
                ],
                'message': 'docs: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ]
    ],
    preset: 'angular'
}