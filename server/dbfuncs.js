import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

export const supabase = createClient(process.env.DB_URL,process.env.API_KEY);

const BASE_IMG_URL = 'https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/'

export const getItems = async (amount, user) => {
  const { data, error } = await supabase.from('sights').select() // TODO hämta enbart det man inte har sett
  if (error) return error

  // TODO fixa så att den väljer annorlunda varje gång
  const splicedData = data.splice(0, amount)
  return await Promise.all(splicedData.map(async ({sight_id, name, short_info, long_info, price, main_tag_id, address_id, number_of_img, short_price}) => {
    const images = []
    const open_hours = await getOpenHours(sight_id)
    const location = await getLocation(address_id)
    const sub_tags = await getSubTags(sight_id)

    for (let i = 1; i <= number_of_img; i++)
      images.push(BASE_IMG_URL + 'sights/' + sight_id + '/' + i + '.jpg')

    return {sight_id, name, short_info, long_info, price, main_tag_id, address_id, images, short_price, open_hours, location, sub_tags}
  }))
}

export const getOpenHours = async (sightId) => {
  const {data, error} = await supabase.from('open_hours').select().eq('sight_id', sightId)
  return data[0]
}

export const getLocation = async (addressId) => {
  const {data, error} = await supabase.from('addresses').select('location').eq('address_id', addressId)
  // console.log(data[0].location)
  return data[0].location
}


export const getLikes = async (userId, page, filter, sort) => {
  const { data, error } = await supabase
    .from('liked_sights')
    .select('user_id, liked_at, sights (sight_id, name)')
    .order('liked_at', { ascending: sort === "old" })
    .eq('user_id', 'cfb5b9bd-ece8-470e-89c0-8ac52122652a')
    .range(page * 10, page * 10 + 9)
    
  if (error) return error

  console.log("working")

  console.log(data)

  return data
}

export const getUser = async (userId) => {
  const { data, error } = await supabase.from('users').select('username, user_id').eq('user_id', userId)
  if (error) return error

  return data[0]
}

export const getFullInfo = async (sightId, onlyLong) => {
  
  // commented version doesnt work on sights that are missing in the opening hours table
  // const {data, error} = await supabase.from('open_hours').select('sights ( long_info )').eq('sight_id', sightId)
  const {data, error} = await supabase.from('sights').select('long_info, price').eq('sight_id', sightId)
  const open_hours = await getOpenHours(sightId)
  if (error) return error

  return [data, open_hours]
}

export const addLikes = async (userId, sightId) => {
  const { data, error } = await supabase.from('liked_sights').insert([{user_id: userId, sight_id: sightId}])
  if (error) return error

  return {sightId}

}

export const getSubTags = async (sightId) => {
  const {data, error} = await supabase.from('sub_tag').select('tag_id').eq('sight_id', sightId)
  if(error) return error

  return data
}

export const getTagValue = async (userId, tagId) => {
  const {data, error} = await supabase.from('tag_values').select('value').eq('user_id', 'cfb5b9bd-ece8-470e-89c0-8ac52122652a').eq('tag_id', tagId)
  if(error) return error

  return data
}

export const algorithm = async(userId, sights) => {


  const similarities = []
  let similarity = 0
  const values = []

  for(let i = 0; i < sights.length; i++) {
    for(let j = 0; j < sights[i].sub_tags.length; j++) {
      const tagId = sights[i].sub_tags[j].tag_id
      //values.push(tagId)
      const value = (await getTagValue(userId, tagId))[0].value
      similarity += value
      getTagValue(userId, tagId)
    }
    similarities.push([sights[i], similarity])
    similarity = 0
  }

  return similarities

}