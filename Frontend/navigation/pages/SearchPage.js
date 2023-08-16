import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image, FlatList, Share} from 'react-native';
import { SearchBar } from '@rneui/themed';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const type = ["Name", "Key Words"]

export default function SearchPage({navigation}){
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState("Name"); 
    const [isSearched, setIsSearched] = React.useState(false);
    
    const onClearPress = () => {
      setInput("");         
      setIsSearched(false); 
      setResult([]);        
    }

    const onChangeText = async (text) => {
      setInput(text)
    };

    const inviteTherapist = () => {
      const linkToShare = 'https://www.diallapp.com/';
   
      Share.share({
        title: 'Invite Your Therapist',
        message: `I think you would love Diall. Here is an invite to get the app! Check out this link: ${linkToShare}`,
        // url: linkToShare
      });
    };

    const onSearchPress = async () => {
      setIsSearched(true)

      let url;
      if (selectedType === "Name") {
        url = `https://us-central1-diall-assessment-66398.cloudfunctions.net/getTherapistByName?username=${input}`;
      } else if (selectedType === "Key Words") {
        url = `https://us-central1-diall-assessment-66398.cloudfunctions.net/getTherapistByKeywords?keywords=${input}`;
      } else {
        console.log("No type selected or unknown type.");
        return;  // Exit the function if no type is selected or if the type is unknown
      }

      axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setResult(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    }

    return(
      <View style={{ flex: 1, alighItems:'center', justifyContent:'flex-start'}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={input}
            placeholder="Search for therapist..."
            autoFocus
          />
          <Button
            icon={
              <Icon name="search" size={15} color="white"/>
            }
            onPress={onSearchPress}
          />
          {(result.length != 0) && (
            <FlatList
              data={ result }
              renderItem={({ item }) => (
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <Image 
                    // source={{uri: item.profilepic}}
                    source={{
                      uri: 'https://ffd77b26c868a8a2ac4159dbec1fe8e47bd51fc66d0427839f5999f-apidata.googleusercontent.com/download/storage/v1/b/diall-assessment/o/UserPic%2Fkarsten-winegeart-Qb7D1xw28Co-unsplash.jpg?jk=ATmLuOFNuzT0oDTJWqVUjxb2DlHz8-dKEqFAm1j83_gSmgItg2Mq4iZNWMbBLxgE-OXa7Hmg5yR1kzXoIFvQHmHmn4QLQPGak5bMocwKCWM-8WS9EX2LLQvRYXn08ZpHJnk3SuSfs2XAJC-14YvyRzZBm9mzkGF1j_aaS2kqerbHb0tIOwtEwQSZ-843tPsg1PI7M9TEUnGRfETlcSwD4sq0bn1AJ7_BMZR5ks6xBjPTZljm_c4hs84tRDkwNTzCl0BMFCSdOhDAEc0b-zhkvJv6LubDWQeJj4WUse5zql1JV0sXzu5pwVjKfBiz0DyTWXAvsE5rT3lM3FNSxgxdtZbQfrn5fLoOlaTKMMViXDGOaPTUcYace5JVzbqnAZyVZ98LwgILui2AUpEr_hp6yiTicORefznOH1OnZYJcPXFxOcLXxlEtASfvzOuD993cxooTUaGaRxchUFhULvN1vTwp9DbfnNyiSmgSFLjU1xP7QTp5bC7dMYJrNEW0Fu9yg5FYRtayKP7hI1Govg_V7vDsc4EWwp2xhXLkGNc24fyuQH0WPfD7OAQKTbf7HmvvIYEP_VYHbXrgjLWpibIH-zPbwfbtw-34mYfoMbH19OyAsAqF0WnALO49GiSVoN4Gl3tF3mnnIzyBOzO58ACk9TAjRU5oRXjNkoZmUN8tDDYusVZvCbnly7Me07Z88Q6vwN-_8EtY57nvfrmme7QVX1KxlIZ4lPM_U9-EXsWmxz_A9_0kC7bZk_dwpCu1M1B1-7jUq4Sf-L-AGFhBACVigib7uwxPqiGfVe5EvWBop15URp7qVLlv-GSdO6dS9B_qg5rYC8Avl2yI4bw0ULKKZ8N3I2BJ_Wrw_O76DWdxIk7w1ZdGpCdbQEz7s-ldO1JYZX-bjbrkqjT0B06aDgIjip6lRRgWHofJRF7KnP_UtHmQOVaNwqlqyjX0wLMQdfQpalvJYgeb-prsZW7Czqo_S_BUaoHYqdl4oZT-KESH1EE0Zp_v4FDfIzYMfr1s-x8AuY-bTP1u4zPLG3rd7iHdCfgukL-D7MNV3m8RtHf_pgHqUh-EfvgpH9F9u4AvnLkdWuDbee2ZjgOtosZs3KI9WDeprohC-IvfRzX3GW_Ztk8lXYL72HxTqJZsQPBb3xPuuSkFWcSwHdCacd5iz18Xjv3s8sqhTLoeh8VeFkYpppaXtj0_4WuFrisPWhRs-iF9RqWeat8xO-Rk2g2D3btFPzib_dN8ejcrntRyGC23v3-rj7KdiNRHjw&isca=1',
                    }}
                    style={{width: 100, height: 100, borderRadius: 50}}
                    resizeMode="cover"
                  />
                  <Text>{item.username}</Text>
                  <Text style={{ fontStyle: 'italic' }}>{item.specialties}</Text>
                  <Button
                    title="Ask"
                    buttonStyle={{ backgroundColor: 'green', width: 50, height: 50 }}
                    titleStyle={{ fontSize: 12 }}
                    onPress={() => {
                    }}
                  />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
          />
            )}
          {((isSearched) && result.length == 0) && (
            <>
              <Text>Don't see your therapist?</Text>
              <Button
                title="Invite your therapist"
                buttonStyle={{ backgroundColor: 'green', marginTop: 10 }}
                onPress={inviteTherapist}
              />
            </>
          )}       
          {/* <SearchBar
            placeholder="Search Here..."
            lightTheme
            round
            value={input}
            onChangeText={(text) => onChangeText(text)}
            autoFocus
            onSubmitEditing={()=>console.log(`User typed ${keywords}`)}
          /> */}

          <SelectDropdown
            data={type}
            defaultValue={"Name"}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              setSelectedType(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
            <Button
              title="Clear"
              onPress={onClearPress}
            />
          {/* List display result one by one*/}
      </View>
    )
}