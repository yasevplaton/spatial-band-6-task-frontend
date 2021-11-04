import { useEffect, useRef } from "react";
import { createTileLayerComponent, updateGridLayer } from "@react-leaflet/core";
import L from "leaflet";
import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import cloneDeep from "lodash/cloneDeep";
import extend from "lodash/extend";
import merge from "lodash/merge";
import has from "lodash/has";
import find from "lodash/find";
import "leaflet.vectorgrid";

export const VectorGrid = createTileLayerComponent(
  function CreateTileLayer(props, context) {
    const highlight = useRef(null);
    const active = useRef(null);
    const {
      data,
      style,
      hoverStyle,
      activeStyle,
      onClick,
      onMouseover,
      onMouseout,
      onDblclick,
      onContextmenu,
      vectorTileLayerStyles,
      url,
      maxNativeZoom,
      subdomains,
      accessKey,
      accessToken,
      type = "protobuf",
      interactive = true,
      ...rest
    } = props;
    delete rest.leaflet;

    useEffect(() => {
      const { tooltipClassName = "", tooltip = null, popup = null } = props;
      if (tooltip) {
        vectorGrid.bindTooltip(
          (layer) => {
            if (isFunction(tooltip)) {
              return tooltip(layer);
            } else if (isString(tooltip) && has(layer.properties, tooltip)) {
              return String(layer.properties[tooltip]);
            } else if (isString(tooltip)) {
              return tooltip;
            }
            return "";
          },
          {
            sticky: true,
            direction: "auto",
            className: tooltipClassName,
          }
        );
      }
      if (popup) {
        vectorGrid.bindPopup(popup);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.tooltip, props.popup]);

    const baseStyle = (properties, zoom) => {
      if (isFunction(style)) {
        return style(properties);
      } else if (isObject(style)) {
        return style;
      }
      return {
        weight: 0,
        opacity: 0.1,
        color: "#ccc",
        fillColor: "#390870",
        fillOpacity: 0.6,
        fill: true,
        stroke: false,
      };
    };

    const _getFeatureId = (feature) => {
      const { idField } = props;
      if (isFunction(idField)) {
        return idField(feature);
      } else if (isString(idField)) {
        return feature.properties[idField];
      }
    };

    const setFeatureStyle = (id, style) => {
      vectorGrid.setFeatureStyle(id, style);
    };

    const resetFeatureStyle = (id) => {
      vectorGrid.resetFeatureStyle(id);
    };

    const clearHighlight = (properties) => {
      if (highlight.current) {
        if (highlight.current !== active.current) {
          resetFeatureStyle(highlight.current);
        } else {
          let st;
          if (isFunction(activeStyle)) {
            st = activeStyle(properties);
          } else if (isObject(activeStyle)) {
            st = cloneDeep(activeStyle);
          }
          if (!isEmpty(st)) {
            const base = cloneDeep(baseStyle(properties));
            const activeStyle = extend(base, st);
            setFeatureStyle(active.current, activeStyle);
          }
        }
      }
      highlight.current = null;
    };

    const clearActive = () => {
      if (active.current) {
        resetFeatureStyle(active.current);
      }
      active.current = null;
    };

    const getFeature = (featureId) => {
      const { data, idField } = props;
      if (isEmpty(data) || isEmpty(data.features)) return {};
      const feature = find(
        data.features,
        ({ properties }) => properties[idField] === featureId
      );
      return cloneDeep(feature);
    };

    const _propagateEvent = (eventHandler, e) => {
      if (!isFunction(eventHandler)) return;
      const featureId = _getFeatureId(e.layer);
      const feature = getFeature(featureId);
      const event = cloneDeep(e);
      // eslint-disable-next-line
      const mergedEvent = merge(event.target, {
        feature,
      });
      eventHandler(event);
    };

    let vectorGrid;
    if (type === "slicer") {
      vectorGrid = new L.vectorGrid.slicer(data, {
        interactive: interactive,
        getFeatureId: (feature) => _getFeatureId(feature),
        rendererFactory: L.svg.tile,
        vectorTileLayerStyles: vectorTileLayerStyles || {
          sliced: (properties, zoom) => {
            const bs = baseStyle(properties, zoom);
            bs.fill = true;
            bs.stroke = true;
            return bs;
          },
        },
        ...rest,
      });
    } else {
      vectorGrid = new L.vectorGrid.protobuf(url, {
        interactive: interactive,
        key: accessKey,
        token: accessToken,
        vectorTileLayerStyles: { ...vectorTileLayerStyles },
        getFeatureId: (feature) => _getFeatureId(feature),
        rendererFactory: L.canvas.tile,
        ...rest,
      });
    }
    vectorGrid
      .on("mouseover", (e) => {
        const { properties } = e.layer;
        _propagateEvent(onMouseover, e);
        let st;
        const featureId = _getFeatureId(e.layer);
        if (isFunction(hoverStyle)) {
          st = hoverStyle(properties);
        } else if (isObject(hoverStyle)) {
          st = cloneDeep(hoverStyle);
        }
        if (!isEmpty(st) && featureId) {
          clearHighlight(properties);
          highlight.current = featureId;
          const base = cloneDeep(baseStyle(properties));
          const hoverStyle = extend(base, st);
          setFeatureStyle(featureId, hoverStyle);
        }
      })
      .on("mouseout", (e) => {
        const { properties } = e.layer;
        _propagateEvent(onMouseout, e);
        clearHighlight(properties);
      })
      .on("click", (e) => {
        const { properties } = e.layer;
        const featureId = _getFeatureId(e.layer);
        _propagateEvent(onClick, e);
        let st;
        if (isFunction(activeStyle)) {
          st = activeStyle(properties);
        } else if (isObject(activeStyle)) {
          st = cloneDeep(activeStyle);
        }
        if (!isEmpty(st) && featureId) {
          clearActive();
          active.current = featureId;
          const base = cloneDeep(baseStyle(properties));
          const activeStyle = extend(base, st);
          setFeatureStyle(featureId, activeStyle);
        }
      })
      .on("dblclick", (e) => {
        _propagateEvent(onDblclick, e);
        clearActive();
      })
      .on("contextmenu", (e) => {
        _propagateEvent(onContextmenu, e);
        clearActive();
      });

    return {
      instance: vectorGrid,
      context,
    };
  },

  function upgrade(layer, props, prevprops) {
    return updateGridLayer(layer, props, prevprops);
  }
);

export default VectorGrid;
