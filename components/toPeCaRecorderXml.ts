import { js2xml } from 'xml-js';
import Favorite from './Favorite';

function boolStr(bool: boolean) {
  return bool ? 'true' : 'false';
}

export default function toPeCaRecorderXml(
  favorites: readonly Favorite[]
): string {
  const xmlData = {
    _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
    root: {
      _attributes: { version: '100' },
      item: favorites.map((x) => {
        const enableBitrate =
          x.searchTarget.bitrate && x.regExpToNumberString() != null;
        const enableListeners =
          x.searchTarget.listeners && x.regExpToNumberString() != null;
        return {
          _attributes: {
            enable: boolStr(x.enable),
            name: x.name,
            favorite: 'true',
            download: 'false',
            ignore: boolStr(x.type === 'ignore'),
          },
          base: {
            search: { _text: x.regExp },
            source: {},
            normal: {
              _attributes: {
                channelName: boolStr(x.searchTarget.channelName),
                genre: boolStr(x.searchTarget.genre),
                detail: boolStr(x.searchTarget.description),
                comment: boolStr(x.searchTarget.comment),
                artist: 'false',
                title: boolStr(x.searchTarget.trackTitle),
                album: 'false',
              },
            },
            extra: {
              _attributes: {
                ypName: boolStr(x.searchTarget.ypName),
                ypUrl: 'false',
                contactUrl: boolStr(x.searchTarget.contactUrl),
                trackContactUrl: 'false',
                type: boolStr(x.searchTarget.type),
                status: 'false',
                id: boolStr(x.searchTarget.streamUrl),
                tip: boolStr(x.searchTarget.streamUrl),
              },
            },
          },
          and: {
            _attributes: { enable: 'false' },
            search: {},
            source: {},
            normal: {
              _attributes: {
                channelName: 'true',
                genre: 'false',
                detail: 'false',
                comment: 'false',
                artist: 'false',
                title: 'false',
                album: 'false',
              },
            },
            extra: {
              _attributes: {
                ypName: 'false',
                ypUrl: 'false',
                contactUrl: 'false',
                trackContactUrl: 'false',
                type: 'false',
                status: 'false',
                id: 'false',
                tip: 'false',
              },
            },
          },
          not: {
            _attributes: { enable: 'false' },
            search: {},
            source: {},
            normal: {
              _attributes: {
                channelName: 'true',
                genre: 'false',
                detail: 'false',
                comment: 'false',
                artist: 'false',
                title: 'false',
                album: 'false',
              },
            },
            extra: {
              _attributes: {
                ypName: 'false',
                ypUrl: 'false',
                contactUrl: 'false',
                trackContactUrl: 'false',
                type: 'false',
                status: 'false',
                id: 'false',
                tip: 'false',
              },
            },
          },
          option: {
            _attributes: {
              icase: boolStr(x.ignoreCase),
              width: boolStr(x.ignoreFullwidthAndHalfwidth),
            },
          },
          bitrate: {
            _attributes: {
              enableMin: boolStr(enableBitrate),
              min: enableBitrate ? x.regExpToNumberString() : '0',
              enableMax: boolStr(enableBitrate),
              max: enableBitrate ? x.regExpToNumberString() : '0',
            },
          },
          listener: {
            _attributes: {
              enableMin: boolStr(enableListeners),
              min: enableListeners ? x.regExpToNumberString() : '0',
              enableMax: boolStr(enableListeners),
              max: enableListeners ? x.regExpToNumberString() : '0',
            },
          },
          relay: {
            _attributes: {
              enableMin: 'false',
              min: '0',
              enableMax: 'false',
              max: '0',
            },
          },
          time: {
            _attributes: {
              enableMin: 'false',
              min: '0',
              enableMax: 'false',
              max: '0',
            },
          },
          new: { _attributes: { new: 'false', notNew: 'false' } },
          play: {
            _attributes: {
              play: 'false',
              notPlay: 'false',
              listener: 'false',
              notListener: 'false',
              relay: 'false',
              notRelay: 'false',
            },
          },
          common: {
            _attributes: {
              sort: 'true',
              enableText: boolStr(x.textColor != null && x.textColor >= 0),
              text: x.textColor != null ? x.textColor.toString() : '0',
              enableBg: boolStr(
                x.backgroundColor != null && x.backgroundColor >= 0
              ),
              bg: x.backgroundColor != null ? x.backgroundColor : '16777215',
            },
          },
          favorite: {
            _attributes: {
              tab: boolStr(x.type === 'favorite'),
              all: boolStr(x.type === 'favorite'),
              exclusive: 'true',
              player: 'false',
            },
          },
          download: { _attributes: { execute: 'true', observe: 'true' } },
          ignore: { _attributes: { show: 'true' } },
          notify: {
            _attributes: {
              notify: boolStr(x.notification),
              enableAlarm: 'false',
              alarm: '',
            },
          },
        };
      }),
    },
  };
  return js2xml(xmlData, { spaces: '\t', compact: true }) + '\n';
}
