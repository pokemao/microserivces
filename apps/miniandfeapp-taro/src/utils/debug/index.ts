import Taro from '@tarojs/taro'
import msSDK from 'ms'

function formatArgs(args, env) {
  args[0] = (this.useColors ? '%c' : '') +
    this.namespace +
    (this.useColors ? ' %c' : ' ') +
    args[0] +
    (this.useColors ? '%c ' : ' ') +
    '+' + env.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }
    index++;
    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

function save() {}

function load(env) {
  let r
  try {
    r = env.storage.getItem('debug')
  } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
  }

  try {
    if (!r && 'microservices:*') {
      r = 'microservices:*'
    }
  } catch {
    // nop
  }

  return r
}

function useColors() {
  return true
}

function localstorage() {
  return {
    setItem(key, value) {
      return Taro.setStorageSync(key, value)
    },
    removeItem(key) {
      return Taro.removeStorageSync(key)
    },
    getItem(key) {
      return Taro.getStorageSync(key)
    }
  }
}

const env = {
  formatArgs,
  save,
  load,
  useColors,
  localstorage,
  destory: (() => {
    let warned = false

    return () => {
      if (!warned) {
        warned = true
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        )
      }
    }
  })(),
  colors: [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
  ],
  log: console.log || (() => {})
}


function setup(env) {
  function createDebug(namespace) {
    let prevTime
    let enableOverride = null
    let namespacesCache
    let enabledCache

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return
      }

      const self = debug

      // Set `diff` timestamp
      const curr = Number(new Date())
      const ms = curr - (prevTime || curr)
      self.diff = ms
      self.prev = prevTime
      self.curr = curr
      prevTime = curr

      args[0] = createDebug.coerce(args[0])

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O')
      }

      // Apply any `formatters` transformations
      let index = 0
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%'
        }
        index++
        const formatter = createDebug.formatters[format]
        if (typeof formatter === 'function') {
          const val = args[index]
          match = formatter.call(self, val)

          // Now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1)
          index--
        }
        return match
      })

      // Apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args, createDebug)

      if (
        createDebug.enabled((namespace ? namespace + '~' : '') + 'debugStack')
      ) {
        try {
          const stack = new Error().stack.split('\n    at ')[2].split('(')
          args.push(stack.length > 1 ? stack[1].slice(0, -1) : stack[0])
        } catch {
          // nop
        }
      }

      const logFn = self.log || createDebug.log
      logFn.apply(self, args)
    }

    debug.namespace = namespace
    debug.useColors = createDebug.useColors()
    debug.color = createDebug.selectColor(namespace)
    debug.extend = extend
    debug.destroy = createDebug.destroy // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces
          enabledCache = createDebug.enabled(namespace)
        }

        return enabledCache
      },
      set: (v) => {
        enableOverride = v
      }
    })

    // Env-specific initialization logic for debug instances
    if (typeof createDebug.init === 'function') {
      createDebug.init(debug)
    }

    return debug
  }
  createDebug.debug = createDebug
  createDebug.default = createDebug
  createDebug.coerce = coerce
  createDebug.disable = disable
  createDebug.enable = enable
  createDebug.enabled = enabled
  createDebug.humanize = msSDK
  createDebug.destroy = destroy

  Object.keys(env).forEach((key) => {
    createDebug[key] = env[key]
  })

  /**
   * The currently active debug mode names, and names to skip.
   */

  createDebug.names = []
  createDebug.skips = []

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */
  createDebug.formatters = {}

  /**
   * Selects a color for a debug namespace
   * @param {String} namespace The namespace string for the debug instance to be colored
   * @return {Number|String} An ANSI color code for the given namespace
   * @api private
   */
  function selectColor(namespace) {
    let hash = 0

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length]
  }
  createDebug.selectColor = selectColor

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */


  function extend(namespace, delimiter) {
    const newDebug = createDebug(
      this.namespace +
        (typeof delimiter === 'undefined' ? ':' : delimiter) +
        namespace
    )
    newDebug.log = this.log
    return newDebug
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */
  function enable(namespaces) {
    createDebug.save(namespaces)
    createDebug.namespaces = namespaces

    createDebug.names = []
    createDebug.skips = []

    let i
    const split = (typeof namespaces === 'string' ? namespaces : '').split(
      /[\s,]+/
    )
    const len = split.length

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue
      }

      namespaces = split[i].replace(/\*/g, '.*?')

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'))
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'))
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @return {String} namespaces
   * @api public
   */
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => '-' + namespace)
    ].join(',')
    createDebug.enable('')
    return namespaces
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */
  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true
    }

    let i
    let len

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true
      }
    }

    return false
  }

  /**
   * Convert regexp to namespace
   *
   * @param {RegExp} regxep
   * @return {String} namespace
   * @api private
   */
  function toNamespace(regexp) {
    return regexp
      .toString()
      .substring(2, regexp.toString().length - 2)
      .replace(/\.\*\?$/, '*')
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message
    }
    return val
  }

  /**
   * XXX DO NOT USE. This is a temporary stub function.
   * XXX It WILL be removed in the next major release.
   */
  function destroy() {
    console.warn(
      'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
    )
  }

  createDebug.enable(createDebug.load(env))

  return createDebug
}

const debug = setup(env)

const { formatters } = debug

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v)
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message
  }
}

export {
  debug
}
