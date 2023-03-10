/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv from 'ajv';
import SpotifyTracksType from './ids';
export const ajv = new Ajv({
  allErrors: true,
  coerceTypes: false,
  format: 'fast',
  nullable: true,
  unicode: true,
  uniqueItems: true,
  useDefaults: true,
});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export const SpotifyTracksTypeSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  defaultProperties: [],
  definitions: {
    SpotifyTrackAlbumArtistType: {
      defaultProperties: [],
      properties: {
        external_urls: {
          $ref: '#/definitions/SpotifyTrackExternalUrlsType',
        },
        href: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: ['external_urls', 'href', 'id', 'name', 'type', 'uri'],
      type: 'object',
    },
    SpotifyTrackAlbumType: {
      defaultProperties: [],
      properties: {
        album_group: {
          type: 'string',
        },
        album_type: {
          type: 'string',
        },
        artists: {
          items: {
            $ref: '#/definitions/SpotifyTrackAlbumArtistType',
          },
          type: 'array',
        },
        available_markets: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        external_urls: {
          $ref: '#/definitions/SpotifyTrackExternalUrlsType',
        },
        href: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        images: {
          items: {
            $ref: '#/definitions/SpotifyTrackImageType',
          },
          type: 'array',
        },
        name: {
          type: 'string',
        },
        release_date: {
          type: ['null', 'string'],
        },
        release_date_precision: {
          type: ['null', 'string'],
        },
        restrictions: {
          $ref: '#/definitions/SpotifyTrackRestrictionsType',
        },
        total_tracks: {
          type: 'number',
        },
        type: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: [
        'album_type',
        'artists',
        'available_markets',
        'external_urls',
        'href',
        'id',
        'images',
        'name',
        'release_date',
        'release_date_precision',
        'total_tracks',
        'type',
        'uri',
      ],
      type: 'object',
    },
    SpotifyTrackArtistType: {
      defaultProperties: [],
      properties: {
        external_urls: {
          $ref: '#/definitions/SpotifyTrackExternalUrlsType',
        },
        followers: {
          $ref: '#/definitions/SpotifyTrackFollowersType',
        },
        genres: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        href: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        images: {
          items: {
            $ref: '#/definitions/SpotifyTrackImageType',
          },
          type: 'array',
        },
        name: {
          type: 'string',
        },
        popularity: {
          type: 'number',
        },
        type: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: ['external_urls', 'href', 'id', 'name', 'type', 'uri'],
      type: 'object',
    },
    SpotifyTrackExternalIDSType: {
      defaultProperties: [],
      properties: {
        ean: {
          type: 'string',
        },
        isrc: {
          type: 'string',
        },
        upc: {
          type: 'string',
        },
      },
      type: 'object',
    },
    SpotifyTrackExternalUrlsType: {
      defaultProperties: [],
      properties: {
        spotify: {
          type: 'string',
        },
      },
      required: ['spotify'],
      type: 'object',
    },
    SpotifyTrackFollowersType: {
      defaultProperties: [],
      properties: {
        href: {
          type: 'string',
        },
        total: {
          type: 'number',
        },
      },
      required: ['href', 'total'],
      type: 'object',
    },
    SpotifyTrackImageType: {
      defaultProperties: [],
      properties: {
        height: {
          type: 'number',
        },
        url: {
          type: 'string',
        },
        width: {
          type: 'number',
        },
      },
      required: ['height', 'url', 'width'],
      type: 'object',
    },
    SpotifyTrackRestrictionsType: {
      defaultProperties: [],
      properties: {
        reason: {
          type: 'string',
        },
      },
      required: ['reason'],
      type: 'object',
    },
    default: {
      defaultProperties: [],
      properties: {
        album: {
          $ref: '#/definitions/SpotifyTrackAlbumType',
        },
        artists: {
          items: {
            $ref: '#/definitions/SpotifyTrackArtistType',
          },
          type: 'array',
        },
        available_markets: {
          items: {
            type: 'string',
          },
          type: 'array',
        },
        disc_number: {
          type: 'number',
        },
        duration_ms: {
          type: 'number',
        },
        explicit: {
          type: 'boolean',
        },
        external_ids: {
          $ref: '#/definitions/SpotifyTrackExternalIDSType',
        },
        external_urls: {
          $ref: '#/definitions/SpotifyTrackExternalUrlsType',
        },
        href: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
        is_local: {
          type: 'boolean',
        },
        is_playable: {
          type: 'boolean',
        },
        name: {
          type: 'string',
        },
        popularity: {
          type: 'number',
        },
        preview_url: {
          type: ['null', 'string'],
        },
        restrictions: {
          $ref: '#/definitions/SpotifyTrackRestrictionsType',
        },
        track_number: {
          type: 'number',
        },
        type: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
      },
      required: [
        'album',
        'artists',
        'available_markets',
        'disc_number',
        'duration_ms',
        'explicit',
        'external_ids',
        'external_urls',
        'href',
        'id',
        'is_local',
        'name',
        'popularity',
        'preview_url',
        'track_number',
        'type',
        'uri',
      ],
      type: 'object',
    },
  },
  properties: {
    href: {
      type: 'string',
    },
    items: {
      items: {
        $ref: '#/definitions/default',
      },
      type: 'array',
    },
    limit: {
      type: 'number',
    },
    next: {
      type: ['null', 'string'],
    },
    offset: {
      type: 'number',
    },
    previous: {
      type: ['null', 'string'],
    },
    total: {
      type: 'number',
    },
  },
  required: ['items'],
  type: 'object',
};
export type ValidateFunction<T> = ((data: unknown) => data is T) &
  Pick<Ajv.ValidateFunction, 'errors'>;
export const isSpotifyTracksType = ajv.compile(
  SpotifyTracksTypeSchema,
) as ValidateFunction<SpotifyTracksType>;
export default function validateSpotifyTracks(
  value: unknown,
): SpotifyTracksType {
  if (isSpotifyTracksType(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(
        isSpotifyTracksType.errors!.filter((e: any) => e.keyword !== 'if'),
        {dataVar: 'SpotifyTracksType'},
      ) +
        '\n\n' +
        inspect(value),
    );
  }
}
