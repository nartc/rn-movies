import { MovieEndpointsPath, ShowEndpointsPath } from '@api/Models';
import { useDebounce } from '@hooks/useDebounce';
import { colors } from '@styles/Colors';
import { mediaTypesMap } from '@utils/constants';
import React, { FC, memo, useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

type TopSearchBarProps = {
  mediaType: MovieEndpointsPath | ShowEndpointsPath;
  onQueryChanged: (query: string) => void;
  setIsFiltering: (isFiltering: boolean) => void;
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: colors.default
  },
  searchBarInputContainer: {
    backgroundColor: colors.default,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    borderTopColor: colors.secondary,
    borderBottomColor: colors.secondary,
    borderRadius: 20
  },
  searchBarInput: {
    color: colors.secondary,
    borderColor: colors.secondary
  }
});

const TopSearchBar: FC<TopSearchBarProps> = memo(({ mediaType, onQueryChanged, setIsFiltering }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    onQueryChanged(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <SearchBar platform={ Platform.OS === 'ios' ? 'ios' : 'android' }
               placeholder={ `Filter ${ mediaTypesMap[mediaType] }` }
               placeholderTextColor={ colors.secondary }
               value={ query }
               onChangeText={ text => {
                 setIsFiltering(!!text);
                 setQuery(text);
               } }
               containerStyle={ styles.searchBarContainer }
               inputContainerStyle={ styles.searchBarInputContainer }
               inputStyle={ styles.searchBarInput }
               cancelButtonProps={ { color: colors.primary } }
               clearIcon={ { color: colors.secondary, name: 'close', type: 'material-community' } }
               cancelIcon={ { color: colors.secondary, name: 'arrow-left', type: 'material-community' } }
               searchIcon={ { color: colors.secondary, name: 'magnify', type: 'material-community' } }/>
  );
});

export default TopSearchBar;
