import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {
  Text,
  VStack,
  HStack,
  Box,
  GluestackUIProvider,
  Divider,
  Tooltip,
  TooltipContent,
  TooltipText,
  Pressable,
} from '@gluestack-ui/themed';
import { config } from '../../core-components/themed/gluestack-ui-provider/config';
import { LayoutContext } from '@gluestack/design-system';

const ColorPaletteComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (!colorMode) return;
    if (colorMode === 'light') {
      setColors(config.tokens.colors);
    } else {
      setColors(config.themes[colorMode].colors);
    }
  }, [colorMode]);

  const sortedPalette = useMemo(() => {
    const colorPalette: any = {
      primary: {},
      secondary: {},
      tertiary: {},
      others: {},
    };

    for (const colorKey in colors) {
      const category = colorKey.replace(/\d+/g, '');
      const shade = colorKey.replace(/\D+/g, '');

      if (shade === '') {
        colorPalette.others[category] = colors[colorKey];
        continue;
      }

      if (!colorPalette[category]) {
        colorPalette[category] = {};
      }

      colorPalette[category][shade] = colors[colorKey];
    }

    const sortedColorPalette: any = {};

    for (const category in colorPalette) {
      if (category !== 'others') {
        sortedColorPalette[category] = Object.fromEntries(
          Object.entries(colorPalette[category]).sort()
        );
      }
    }

    sortedColorPalette.others = { ...colorPalette.others };

    return sortedColorPalette;
  }, [colors]);
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <VStack flex={1}>
        {Object.keys(sortedPalette).map((category: string) => {
          return (
            <Fragment key={category}>
              <Text mb="$4" size="md" bold>
                {category}
              </Text>
              <HStack
                key={category}
                w="$full"
                mb="$4"
                flexWrap="wrap"
                sx={{
                  _web: {
                    gap: 16,
                  },
                }}
              >
                {Object.keys(sortedPalette[category]).map((shade: string) => {
                  return (
                    <HStack flexBasis="30%" key={shade}>
                      <Box
                        key={shade}
                        bg={sortedPalette[category][shade]}
                        w="$12"
                        h="$12"
                        rounded="$lg"
                        mr="$4"
                      />
                      <VStack>
                        <Text>
                          {category === 'others'
                            ? `${shade}`
                            : `${category}${shade}`}
                        </Text>
                        <Text>{sortedPalette[category][shade]}</Text>
                      </VStack>
                    </HStack>
                  );
                })}
              </HStack>
            </Fragment>
          );
        })}
      </VStack>
    </GluestackUIProvider>
  );
};

const spaces: any = config.tokens.space;

const sortedSpaceObject: any = spaces;

// Convert the map to an array of key-value pairs for sorting
const mapEntries = Object.entries(sortedSpaceObject);

// Sort the map entries based on the keys
mapEntries.sort(([keyA, valueA]: any, [keyB, valueB]: any) => {
  // Treat 'px' as the smallest and 'full' as the largest
  // Place '0' at the top
  if (keyA === '0') return -1;
  if (keyB === '0') return 1;

  // Treat 'px' as the second smallest
  if (keyA === 'px') return -1;
  if (keyB === 'px') return 1;

  // Treat 'full' as the largest
  if (keyA === 'full') return 1;
  if (keyB === 'full') return -1;

  // Values with '%' should be grouped and sorted at the end
  const isValueAPercentage = valueA.toString().includes('%');
  const isValueBPercentage = valueB.toString().includes('%');
  if (isValueAPercentage && !isValueBPercentage) return 1;
  if (isValueBPercentage && !isValueAPercentage) return -1;

  // Group values with the same denominator and sort them
  const [numA, denomA] = keyA.split('/').map(parseFloat);
  const [numB, denomB] = keyB.split('/').map(parseFloat);

  if (!isNaN(numA) && !isNaN(denomA) && !isNaN(numB) && !isNaN(denomB)) {
    if (denomA === denomB) {
      return numA - numB;
    } else {
      return denomA - denomB; // Sort by denominator if they are different
    }
  }

  // For numeric keys, compare them as numbers
  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  // For other keys, compare them as strings
  return keyA.localeCompare(keyB);
});
// const spaceElementsArray =
// Create a new Map from the sorted map entries

const SpaceComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <VStack>
        <HStack h="$8" alignItems="center">
          <Text w={100} mr="$4">
            Tokens
          </Text>
          <Text w={100} mr="$4">
            Value (Pixels)
          </Text>
          <Text>Representation</Text>
        </HStack>
        {mapEntries.map(([key, value]: any) => {
          return (
            <Fragment key={`${key}${value}`}>
              <Divider my="$2" />
              <HStack key={key} h="$8" alignItems="center">
                <Text w={100} mr="$4">
                  {key}
                </Text>
                <Text w={100} mr="$4">
                  {value}
                </Text>
                <Box justifyContent="center" flex={1}>
                  <Box bg="$primary500" w={value} h="$4" />
                </Box>
              </HStack>
            </Fragment>
          );
        })}
      </VStack>
    </GluestackUIProvider>
  );
};

const opacity: any = config.tokens.opacity;

const OpacityComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <HStack
        flexWrap="wrap"
        sx={{
          _web: {
            gap: 16,
          },
        }}
      >
        {Object.keys(opacity).map((op: string) => {
          return (
            <Box
              key={opacity}
              sx={{
                _web: {
                  position: 'relative',
                },
              }}
            >
              <Box
                rounded="$lg"
                key={op}
                bg="$cyan400"
                w="$16"
                h="$16"
                opacity={opacity[op]}
                justifyContent="center"
                alignItems="center"
              />
              <VStack
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="center"
                position="absolute"
              >
                <Text
                  opacity={1}
                  color="$textDark800"
                  sx={{
                    _dark: {
                      color: 'white',
                    },
                  }}
                >
                  {op}
                </Text>
                <Text
                  size="2xs"
                  sx={{
                    _dark: {
                      color: 'white',
                    },
                  }}
                >
                  ({opacity[op]})
                </Text>
              </VStack>
            </Box>
          );
        })}
      </HStack>
    </GluestackUIProvider>
  );
};

const ShadowsComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  const hardShadows: any = config.globalStyle.variants.hardShadow;
  const softShadows: any = config.globalStyle.variants.softShadow;

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <VStack>
        <Text size="sm" mb="$4" bold>
          Hard Shadows
        </Text>
        <HStack
          sx={{
            _web: {
              gap: 16,
            },
          }}
        >
          {Object.keys(hardShadows).map((shadow: string) => {
            return (
              <Tooltip
                // eslint-disable-next-line react/no-unstable-nested-components
                trigger={(triggerProps) => {
                  return (
                    <Pressable {...triggerProps}>
                      <Box
                        key={shadow}
                        h="$20"
                        w="$20"
                        rounded="$lg"
                        mb="$4"
                        bg="$primary500"
                        // @ts-ignore
                        hardShadow={shadow}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="$white">{shadow}</Text>
                      </Box>
                    </Pressable>
                  );
                }}
              >
                <TooltipContent flexDirection="column" maxWidth="$48">
                  <TooltipText size="xs">
                    {JSON.stringify(hardShadows[shadow], null, 2)}
                  </TooltipText>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </HStack>
        <Text size="sm" mb="$4" bold>
          Soft Shadows
        </Text>
        <HStack
          sx={{
            _web: {
              gap: 16,
            },
          }}
        >
          {Object.keys(softShadows).map((shadow: string) => {
            return (
              <Tooltip
                // eslint-disable-next-line react/no-unstable-nested-components
                trigger={(triggerProps) => {
                  return (
                    <Pressable {...triggerProps}>
                      <Box
                        key={shadow}
                        h="$20"
                        w="$20"
                        rounded="$lg"
                        mb="$4"
                        bg="$primary500"
                        // @ts-ignore
                        hardShadow={shadow}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="$white">{shadow}</Text>
                      </Box>
                    </Pressable>
                  );
                }}
              >
                <TooltipContent flexDirection="column" maxWidth="$48">
                  <TooltipText size="xs">
                    {JSON.stringify(softShadows[shadow], null, 2)}
                  </TooltipText>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </HStack>
      </VStack>
    </GluestackUIProvider>
  );
};

const borderWidths = config.tokens.borderWidths;
const BorderWidthComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <HStack
        sx={{
          _web: {
            gap: 16,
          },
        }}
      >
        {Object.keys(borderWidths).map((borderWidth: any) => {
          return (
            <Box
              key={borderWidth}
              h="$20"
              w="$20"
              mb="$4"
              bg="$primary500"
              borderRadius="$lg"
              borderColor="$purple600"
              // @ts-ignore
              borderWidth={`$${borderWidth}`}
              justifyContent="center"
              alignItems="center"
            >
              <Text color="$white">{borderWidth}</Text>
              <Text size="2xs" color="$white">
                ({borderWidths[borderWidth]})
              </Text>
            </Box>
          );
        })}
      </HStack>
    </GluestackUIProvider>
  );
};

const radii = config.tokens.radii;
const RadiiComponent = () => {
  const { colorMode } = useContext(LayoutContext);
  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <HStack
        sx={{
          _web: {
            gap: 16,
          },
        }}
        flexWrap="wrap"
      >
        {Object.keys(radii).map((borderRadiusValue: any) => {
          return (
            <Box
              key={borderRadiusValue}
              h="$20"
              w="$20"
              mb="$4"
              bg="$primary500"
              // @ts-ignore
              borderRadius={`$${borderRadiusValue}`}
              justifyContent="center"
              alignItems="center"
            >
              <Text color="$white">{borderRadiusValue}</Text>
              <Text size="2xs" color="$white">
                ({radii[borderRadiusValue]})
              </Text>
            </Box>
          );
        })}
      </HStack>
    </GluestackUIProvider>
  );
};

export {
  ColorPaletteComponent,
  SpaceComponent,
  OpacityComponent,
  ShadowsComponent,
  BorderWidthComponent,
  RadiiComponent,
};

export { Text, VStack, HStack, Box };
