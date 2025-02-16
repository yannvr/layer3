import { useEffect, useState } from 'react';

export interface User {
  rank: number;
  address: string;
  avatarCid: string;
  username: string;
  gmStreak: number;
  xp: number;
  level: number;
  nfts?: OpenSeaNTF[];
}

export interface UseLeaderboardDataResult {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface OpenSeaNFTCollection {
  nfts: OpenSeaNTF[];
}

export interface OpenSeaNTF {
  name: string;
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  description: string;
  image_url: string;
  display_image_url: string;
  display_animation_url: string | null;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}

// API fallback data
/* prettier-ignore */
export const LEADER_BOARD_USER_MOCK = { "users": [{ "rank": 1, "address": "0xF222f955Ecced246f3181d14fB4629469cEB7681", "avatarCid": "QmTUefEyqzfSugwvbCnTjzRdFvp4L5yA6qjEx1yspsr17z", "username": "yakugakusei.eth", "gmStreak": 248, "xp": 169164, "level": 41 }, { "rank": 2, "address": "0xc6571c2FB66825F13b7751b1c334810D397618Eb", "avatarCid": "QmUmDoDszD2GEdqYgkRi5DdTSd5cv4n8ih4akrdzGwWANm", "username": "pancopa.eth", "gmStreak": 283, "xp": 165396, "level": 40 }, { "rank": 3, "address": "0x1AFe8A03214Bf47300c2b3B7918ffDa98Fb359C8", "avatarCid": "QmQgW1EMVhpAzYQHJ8aJj5quDnYPFDf7RNcui2XiaMaqKL", "username": "arnoldcns.eth", "gmStreak": 329, "xp": 164654, "level": 40 }, { "rank": 4, "address": "0xd31A84c20bc430aD75E6a1903E7dDbee52211072", "avatarCid": "QmerjxnHa9wTmdMXfj7oo3FDgiRjHeSqTYWu4N82v71prf", "username": "harusame.eth", "gmStreak": 284, "xp": 163565, "level": 40 }, { "rank": 5, "address": "0x939780173b5D00b026A116dbDfE7b9f6F056Be9C", "avatarCid": "QmdqfrEwGcZFbYwJfiJDoWMdHLCdwRY5vb2TMMzoANzknW", "username": "moonrabbit380.eth", "gmStreak": 282, "xp": 161314, "level": 40 }, { "rank": 6, "address": "0x7c45FB10a18f834a47cc3F470E97140A399B6AF8", "avatarCid": "QmaBinkYwj4QyeZXXwVMgc6JGosEptf5vuSwDCJmTVybVx", "username": "umanuma.eth", "gmStreak": 4, "xp": 161014, "level": 40 }, { "rank": 7, "address": "0xfc46a7673e85F591337e50c260e184d8fD316A82", "avatarCid": "QmRFd8NbcbDNy4fNpsSzZW9S8cHfjU3Dg7hebttRkBvv1F", "username": "meowxixi.eth", "gmStreak": 295, "xp": 160465, "level": 40 }, { "rank": 8, "address": "0x97675D5D3fFd22401B78bA4C0a34fAAdd2039250", "avatarCid": "QmdDGf7ysLmj4KV9fpXy8DoCrdHbehgZpBYtEgPv18S6Q5", "username": "toraneko.eth", "gmStreak": 31, "xp": 159329, "level": 39 }, { "rank": 9, "address": "0x294C2a8BD233fAd3D9c29e9362A42f8881f4461B", "avatarCid": "QmSdriF1k2aLCfmDvZE921TthHftTCYvQHKSUgeK8Dakr5", "username": "bxxdefi.eth", "gmStreak": 20, "xp": 159072, "level": 39 }, { "rank": 10, "address": "0x5F1F6C7ae6944Ef82966365946C1eeb2Ea7a9505", "avatarCid": "Qmck7w7GiGSQCwraBV79EBzB8A8QNURo2hMGMZ5gpun9T1", "username": "izuma.eth", "gmStreak": 209, "xp": 158597, "level": 39 }] };

const useLeaderboardData = (): UseLeaderboardDataResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async (address: string): Promise<OpenSeaNTF[]> => {
      // Returns the first 5 NFTs for the given address
      // const response = await fetch(`https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts?limit=5`, {
      //   headers: {
      //     // In production, we would not expose the API key but use a backend service to fetch the nfts
      //     'x-api-key': 'a3d3c7d1c3804342a876d896c54a8579',
      //   },
      // });
      // const data: OpenSeaNFTCollection = await response.json();
      // console.log('🚀 ~ fetchNFTs ~ data:', data);
      // return data.nfts;
      return [
        {
          identifier: '96560187506112129840141203521085534491419489508805832917156693849909455427975',
          collection: 'casthandles',
          contract: '0x427b8efee2d6453bb1c59849f164c867e4b2b376',
          token_standard: 'erc721',
          name: 'mindless-camel706.cast',
          description:
            'Check the status of mindless-camel706.cast on https://wield.xyz, check out https://far.quest and FarHero AI (https://far.quest/hero) 👁️',
          image_url: 'https://raw.seadn.io/files/9dc123f14c96f6fc9c242f58d96e881c.svg',
          display_image_url: 'https://raw.seadn.io/files/9dc123f14c96f6fc9c242f58d96e881c.svg',
          display_animation_url: null,
          metadata_url:
            'https://build.far.quest/metadata/uri/96560187506112129840141203521085534491419489508805832917156693849909455427975',
          opensea_url:
            'https://opensea.io/assets/ethereum/0x427b8efee2d6453bb1c59849f164c867e4b2b376/96560187506112129840141203521085534491419489508805832917156693849909455427975',
          updated_at: '2025-01-31T04:59:02.711559',
          is_disabled: false,
          is_nsfw: false,
        },
        {
          identifier: '6176',
          collection: 'polyhedra-2024-6',
          contract: '0xb7545014a3973b0d27a65ee76d1a5ee29d37b1c9',
          token_standard: 'erc721',
          name: 'Polyhedra 2024',
          description: 'The Polyhedra team wishes everyone a prosperous and innovative 2024.',
          image_url: 'https://ipfs.io/ipfs/QmZgnyKmfFfoxEh1BaC5J6ZjNbnboox4AZ9gigoNtgppSJ',
          display_image_url: 'https://i.seadn.io/s/raw/files/79655d9bfa9a1c8302ccab44a3a38580.png?w=500&auto=format',
          display_animation_url: null,
          metadata_url: 'https://ipfs.io/ipfs/QmSUpx6i5GPy6s1aHaYmzPmHsFo2oQW95sFDV3yN6NyUQv',
          opensea_url: 'https://opensea.io/assets/ethereum/0xb7545014a3973b0d27a65ee76d1a5ee29d37b1c9/6176',
          updated_at: '2024-02-06T02:25:50.988226',
          is_disabled: false,
          is_nsfw: false,
        },
        {
          identifier: '0',
          collection: 'exchange-pass',
          contract: '0x75ad4c505e5b4bb65b832c91eb76529ce07220f1',
          token_standard: 'erc1155',
          name: 'Exchange Pass',
          description: 'Exchange Pass holders get early access to app.aevo.xyz',
          image_url: 'https://ipfs.io/ipfs/bafybeicfy7ndkwji3kntxmm2xaxha5bqblsxht7vlqfxnpzi45qwz75r2y/aevo.gif',
          display_image_url: 'https://i.seadn.io/s/raw/files/503c508e918148c1ebc4c8c8325bd96d.gif?w=500&auto=format',
          display_animation_url: 'https://raw.seadn.io/files/dcd2dfa7a422e24d809a3571f3138fd5.gltf',
          metadata_url:
            'data:application/json;base64,ewogICJuYW1lIjogIkV4Y2hhbmdlIFBhc3MiLAogICJkZXNjcmlwdGlvbiI6ICJFeGNoYW5nZSBQYXNzIGhvbGRlcnMgZ2V0IGVhcmx5IGFjY2VzcyB0byBhcHAuYWV2by54eXoiLAogICJleHRlcm5hbF91cmwiOiAiaHR0cHM6Ly9hcHAuYWV2by54eXoiLAogICJpbWFnZSI6ICJpcGZzOi8vYmFmeWJlaWNmeTduZGt3amkza250eG1tMnhheGhhNWJxYmxzeGh0N3ZscWZ4bnB6aTQ1cXd6NzVyMnkvYWV2by5naWYiLAogICJhbmltYXRpb25fdXJsIjogImlwZnM6Ly9iYWZ5YmVpZ3J2dm5ra3lwY3VudnQ0bWlmZXpycXNrcHQyNHR1Y2t0ZWhwNXI0b3F2cGIyZmV6c2JpbS9hZXZvLmdsdGYiLAogICJiYWNrZ3JvdW5kX2NvbG9yIjogIjA2MDYwQyIsCiAgImF0dHJpYnV0ZXMiOiBbXQp9',
          opensea_url: 'https://opensea.io/assets/ethereum/0x75ad4c505e5b4bb65b832c91eb76529ce07220f1/0',
          updated_at: '2024-06-16T15:35:14.422007',
          is_disabled: false,
          is_nsfw: false,
        },
        {
          identifier: '3426',
          collection: 'honey-comb-2',
          contract: '0xcb0477d1af5b8b05795d89d59f4667b59eae9244',
          token_standard: 'erc721',
          name: 'HoneyComb',
          description: 'ooga booga',
          image_url: 'https://ipfs.io/ipfs/QmTffyDuYgSyFAgispVjuVaTsKnC5vVs7FFq1YkGde4ZX5',
          display_image_url: 'https://i.seadn.io/s/raw/files/f903171253f9df3c304226e9edb75896.jpg?w=500&auto=format',
          display_animation_url: 'https://raw.seadn.io/files/f8f4ef806e7a9b6f8ff29d4cba33a345.mp4',
          metadata_url: 'https://ipfs.io/ipfs/Qmf1ZPzpSZPXzwNgraT6sDXGNBTvJShB4eVkwikRB2sXq9',
          opensea_url: 'https://opensea.io/assets/ethereum/0xcb0477d1af5b8b05795d89d59f4667b59eae9244/3426',
          updated_at: '2024-12-23T13:24:26.157705',
          is_disabled: false,
          is_nsfw: false,
        },
        {
          identifier: '6201',
          collection: 'tubby-cats',
          contract: '0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd',
          token_standard: 'erc721',
          name: '17542',
          description: 'the artwork for tubby cats is released under the CC0 license.',
          image_url: 'https://ipfs.io/ipfs/QmQh8Amhy5EYuhKWDCSA4omqFAoYqdZHCmYa5mAhpitPch/17542.png',
          display_image_url: 'https://i.seadn.io/s/raw/files/13a42ab0479c84f8974e235b9bec14b7.png?w=500&auto=format',
          display_animation_url: null,
          metadata_url: 'https://ipfs.io/ipfs/QmeN7ZdrTGpbGoo8URqzvyiDtcgJxwoxULbQowaTGhTeZc/17542.json',
          opensea_url: 'https://opensea.io/assets/ethereum/0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd/6201',
          updated_at: '2024-08-09T06:59:36.719997',
          is_disabled: false,
          is_nsfw: false,
        },
      ];
    };

    const fetchUsers = async () => {
      try {
        // The API is currently blocking access to localhost as it is not allowed in the CORS policy
        // However, we'll still implement the fetch logic as it's the expected logic
        const response = await fetch('https://layer3.xyz/api/assignment/users').catch((err) => {
          console.warn('Failed to fetch leaderboard data, return mocked data');
        });
        const data = response ? await response.json() : LEADER_BOARD_USER_MOCK;

        const usersWithNFTs = await Promise.all(
          data.users.map(async (user: User) => {
            const nfts = await fetchNFTs(user.address);
            return { ...user, nfts };
          }),
        );
        // Sort users by level
        usersWithNFTs.sort((a, b) => b.level - a.level);
        setUsers(usersWithNFTs);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // ensure error is a string before displaying
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useLeaderboardData;
