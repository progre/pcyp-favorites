import { js2xml } from 'xml-js';
import Favorite from './Favorite';

export default function toPeCaRecorderXml(
  favorites: readonly Favorite[]
): string {
  const xmlData = {
    _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
    root: {
      _attributes: { version: 100 },
      item: favorites.map((x) => {
        const searchTargetOnlyBitrateAndOrListeners = x.searchTargetOnlyBitrateAndOrListeners();
        const enableBitrate =
          x.searchTarget.bitrate && x.regExpToNumber() != null;
        const enableListeners =
          x.searchTarget.listeners && x.regExpToNumber() != null;
        return {
          _attributes: {
            enable: x.enable,
            name: x.name,
            favorite: true,
            download: false,
            ignore: x.type === 'ignore',
          },
          base: {
            search: {
              _text: searchTargetOnlyBitrateAndOrListeners ? '.*' : x.regExp,
            },
            source: {},
            normal: {
              _attributes: {
                channelName: searchTargetOnlyBitrateAndOrListeners
                  ? true
                  : x.searchTarget.channelName,
                genre: x.searchTarget.genre,
                detail: x.searchTarget.description,
                comment: x.searchTarget.comment,
                artist: false,
                title: x.searchTarget.trackTitle,
                album: false,
              },
            },
            extra: {
              _attributes: {
                ypName: x.searchTarget.ypName,
                ypUrl: false,
                contactUrl: x.searchTarget.contactUrl,
                trackContactUrl: false,
                type: x.searchTarget.type,
                status: false,
                id: x.searchTarget.streamUrl,
                tip: x.searchTarget.streamUrl,
              },
            },
          },
          and: {
            _attributes: { enable: false },
            search: {},
            source: {},
            normal: {
              _attributes: {
                channelName: true,
                genre: false,
                detail: false,
                comment: false,
                artist: false,
                title: false,
                album: false,
              },
            },
            extra: {
              _attributes: {
                ypName: false,
                ypUrl: false,
                contactUrl: false,
                trackContactUrl: false,
                type: false,
                status: false,
                id: false,
                tip: false,
              },
            },
          },
          not: {
            _attributes: { enable: false },
            search: {},
            source: {},
            normal: {
              _attributes: {
                channelName: true,
                genre: false,
                detail: false,
                comment: false,
                artist: false,
                title: false,
                album: false,
              },
            },
            extra: {
              _attributes: {
                ypName: false,
                ypUrl: false,
                contactUrl: false,
                trackContactUrl: false,
                type: false,
                status: false,
                id: false,
                tip: false,
              },
            },
          },
          option: {
            _attributes: {
              icase: x.ignoreCase,
              width: x.ignoreFullwidthAndHalfwidth,
            },
          },
          bitrate: {
            _attributes: {
              enableMin: enableBitrate,
              min: enableBitrate ? x.regExpToNumber() : 0,
              enableMax: enableBitrate,
              max: enableBitrate ? x.regExpToNumber() : 0,
            },
          },
          listener: {
            _attributes: {
              enableMin: enableListeners,
              min: enableListeners ? x.regExpToNumber() : 0,
              enableMax: enableListeners,
              max: enableListeners ? x.regExpToNumber() : 0,
            },
          },
          relay: {
            _attributes: {
              enableMin: false,
              min: 0,
              enableMax: false,
              max: 0,
            },
          },
          time: {
            _attributes: {
              enableMin: false,
              min: 0,
              enableMax: false,
              max: 0,
            },
          },
          new: { _attributes: { new: false, notNew: false } },
          play: {
            _attributes: {
              play: false,
              notPlay: false,
              listener: false,
              notListener: false,
              relay: false,
              notRelay: false,
            },
          },
          common: {
            _attributes: {
              sort: true,
              enableText: x.textColor != null && x.textColor >= 0,
              text: x.textColor != null ? x.textColor.toString() : 0,
              enableBg: x.backgroundColor != null && x.backgroundColor >= 0,
              bg: x.backgroundColor != null ? x.backgroundColor : '16777215',
            },
          },
          favorite: {
            _attributes: {
              tab: x.type === 'favorite',
              all: x.type === 'favorite',
              exclusive: true,
              player: false,
            },
          },
          download: { _attributes: { execute: true, observe: true } },
          ignore: { _attributes: { show: true } },
          notify: {
            _attributes: {
              notify: x.notification,
              enableAlarm: false,
              alarm: '',
            },
          },
        };
      }),
    },
  };
  return js2xml(xmlData, { spaces: '\t', compact: true }) + '\n';
}
