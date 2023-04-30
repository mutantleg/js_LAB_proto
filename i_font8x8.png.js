var font8x8png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAABnRSTlMAMwBfALO9r058AAAHi0lEQVR4nO1cO3IcOwzkqDZ4Po/O4lhnc6zQ59B5FO4LWIKxaDQIzq4EVQldDmYxJAii+QHIkY/nl7+jUYenagN+OpqAYjQBxWgCitEEFKMJKEYTUIwmoBhNQDGagGI0AcVoAorRBBSjCShGE1CMS/z67c9veX5+eUUhvmUartf3McZx/GJ1XbWoeWmSLs/k8iqj/JMw21oQMIjjRKjfogdnH2YZ1GbqXq/vWj7hEmZMmu0ygkX+9uf388srGxDi7mCgPBDS34ctQdoL8sAGNbNGDzrj3xiB15DU6/Vd2ymmmoZQ8ijM/s7n9QxwIV3VfZ5Kdd/0W/SOSND7qEfePr+8ysxDbUbJHPK6/Kw+bjmbxdhMncDVic34GNLQ7NQZAtxmpJ/SPXfVmhCH6pXH9GdqQz1DOfE02CjJ1MIxJwbLc7Anae+PzAzYtQ/7xpjAdd+UlJGLlKNkqpoLvQjNwmgade3c2gOCYu4cMt4fpzdhZo07A3C5GJ4jWLvuAuU27SpE+93NBlcVbNEsfVthkuv9kckDjuNXxvtTqdkbRKjlyTIiWXofNbj2z2LPL6+4Txg+glg5vx6gnikxrR/PL3/ZZmLkcbT+qXhg0/dE98ksIZOUyNuL2f0nhCh5xXYe/TaWs+elnqDpLT1a1enELZP36GKyJzE/P+kfn519uDALDso/qV2dDSzlLNebhbGKHgHxxF3sAcGqGrhsy2usDxrSh0D/rnwXJm8w9ugm9G7hjnpd+F8UhCGETtzRFINgorFaQaJgfppu560K5IyV3dGTr2jCwvnzgq+TMOX1IA0si7NN1B9Mi2X5eN9anh2hfol0ZWV3jXfXKz16tPBmBmT66ZYPnBWHAUG799hzTsPE4Z1z6CMNWSqCQMhdr9y3TzOtN//iuBjLx3Ks+x30uJqDcR1nG8w8l6QbI1kesBV075b/AmQy212bl7MZyy+L0Txg7MTpeOQSl58Pd7Zr5PisW2HDNs5RmM583aGiG9f+k8fRxo7dyOEhcWESn91WsIdlmraJmLv7B6swK59cc5fl83KGOMNgVUbiDErsGYRmt11j+c0MYJlhYCVDHLO7ekwftNwspskDEhdJe5LeRzO0MMP9DQFM0eDrr/tq7OxvbCAHA9yNFJmdiGX+IbEmu7J3792Sdhr4eUBmdi9H7siN0KBddwyei+639Bze7QLrbwD39tT8vAQatZw9S0s6wQv0fLbc3ZPu1JO0R+cfItS3p/4CM8Z/rnYX3zDefxTcromQXYNjeXwb7yWX8f3i93Px9e7zsmumoeV6qAe4zq7i/bw/TUzhen3PT319/busa09DHzW6WcmHp0Wy0eGIc+V6r2IRJy7iLC4KQi/JD+Ko4d7TUJagixHsTOaevcTEJzrYOOATLmOSubdg64MWMg6CjhwfJ3FBbDKRug+QDujGMFY7kRa5EG9qH5lvOrV+veCij9BBZokwnxLpnuLneFp/5mviZUJ6k4i5m7jpmy5vODjndFNLXBavD3pMmAXX+MjoMWyJTt2KO7ldDra6TA/jHhV3x3PN7Y8po+9ajSTZLtuBmJ7YSDSPxf4Z+HnAT/7/gr7yrwEYLoOkDMkLh7g8O0uJdZ6+IAqaY/6V1UY7wX0O9Ot8zf2aLTDpYuzApVAjDihZ4uZ2mOnHu51kArhszgUGDqITo1Vd0WxUrF/apebu65DP01mYtYxq3KnjGhoAjV6eVubtWa7RblvJrRU3c9dOieLcYOEiFu9u8fHpaTyTmB6UYxSEiRXKJbJE/+bvA+JiguPj++2gI4G2f2GoG5Ykpz8Cz7DymTOTmxlpOmZGFtqDH26ydgMlw9tO7knvaR6gbXURj1w0a1keq2BGE3x55wK9yY4uMMdEJWih6FxOLNZudBh3bH5v4wpP68lYheX1M/uSx3wKZT70NJ8GaSWYBLgpSGAPtvtFeUBwqv7d4MadeeEuLsm/zohfxVXcky8TsWzF/ixXYDZkoKsHoRET6r8D2GrXuZBhUdDxcXQ1vIXb/TZrWsZOyjB2zj8PFV2c04NdM2oz0LGmCDUTy+fFfYAbBZnsA+VayM6K74GZ+8tN1cB06rg9pzvg7IhBakkkipNg+WzvA45VMmx6ghFbnB8McvyLCEYijjjkOLioGeQ+QKrshpVXfk+wPQNYTjvNxWHlhgGDM/e2+utU7U3toxP3AWzy4X3AgCGfiRrYJDs5A0x7eNCGjjNl2PKFg9EVLh2nhVIrvg9wvYNHCGjqINPXwF02tmdApiU20lkZbYp0zMhdoSmvNcj1nn6rha4NGUmmQF64NQN+9H3Ad0B/llKMJqAYTUAxmoBiNAHFaAKK0QQUowkoRhNQjCagGE1AMZqAYjQBxWgCitEEFKMJKEYTUIwmoBhNQDGagGI0AcVoAorRBBSjCShGE1CMJqAYTUAxmoBiNAHFaAKK0QQUowkoRhNQjCagGE1AMZqAYjQBxWgCitEEFKMJKEYTUIwmoBhNQDGagGI0AcVoAorRBBSjCShGE1CMJqAYTUAxmoBiNAHFaAKK0QQUowkoRhNQjCagGE1AMZqAYjQBxWgCitEEFON/PceyS+m4MgsAAAAASUVORK5CYII=";