import React, { useState } from 'react'
import PageLayout from '../../layouts/PageLayout'
import styles from './styles/UserProfilePage.module.scss'
import { Tabs, Tab } from '@mui/material'
import Typography from '../../components/Common/Typography/Typography'
import Icons from '../../components/Common/Icons/Icons'
import { useParams } from 'react-router-dom'
import WishlistCard from '../../components/Common/Card/WishlistCard'
import ProfileInfo from './Components/ProfileInfo'
import Orders from './Components/Orders'
import Settings from './Components/Settings'
import Button from '../../components/Common/Button/Button'
import TabPanel from '../../components/Common/TabPanel/TabPanel'
import { useGetUserProileQuery } from '../../redux/features/user/userProfileApi'

const a11yProps = index => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

//Tab static Data
const tabData = [
  { icon: 'person', label: 'Profile' },
  { icon: 'love', label: 'Wishlist' },
  { icon: 'bag', label: 'Orders' },
  { icon: 'settings', label: 'Settings' }
]

const UserProfilePage = () => {
  const [value, setValue] = React.useState(0)
  const [showSideTab, setShowSideTab] = useState(
    window.innerWidth > 700 ? true : false
  )
  const { id } = useParams()
  const { data: userProfile, isLoading, isError } = useGetUserProileQuery(id)

  //Creating new purchases Array from userProfile api returend data, to use in the user's Orders Tab.
  const userOrderHistory =
    !isLoading && !isError && userProfile?.user?.purchases?.length > 0
      ? userProfile?.user?.purchases.map(order => ({
          products: order.product,
          status: order.orderStatus,
          date: order.createdAt,
          id: order._id,
          totalAmount: order.totalAmount
        }))
      : []

  //Creating a user profile object from userProfile api retured data. to use in the user profile Tab.
  const userProfileData = {
    name: userProfile?.user?.name,
    email: userProfile?.user?.email,
    _id: userProfile?.user?._id,
    city: userProfile?.user?.city,
    phone: userProfile?.user?.phone,
    address: userProfile?.user?.address,
    profilePic: userProfile?.user?.image
  }

  // Tab handler
  const handleChange = (_event, newValue) => {
    setValue(newValue)
    if (window.innerWidth < 600) {
      setShowSideTab(false)
    }
  }

  return (
    <PageLayout>
      <div className={styles.page_wrapper}>
        <div className={styles.toggle_btn}>
          {showSideTab && (
            <Button
              variant={'icon-btn-normal'}
              onClick={() => setShowSideTab(!showSideTab)}
            >
              <Icons size={'2.9rem'} color={'#116954'} name={'on'} />
            </Button>
          )}
          {!showSideTab && (
            <Button
              variant={'icon-btn-normal'}
              onClick={() => setShowSideTab(!showSideTab)}
            >
              <Icons size={'2.9rem'} color={'#cc2121'} name={'off'} />
            </Button>
          )}
        </div>
        <Typography variant={'h4'}>My Account</Typography>
        <div className={styles.profile_tab_wrapper}>
          {showSideTab && (
            <div className={styles.tabs_list}>
              <Tabs
                orientation='vertical'
                value={value}
                onChange={handleChange}
                aria-label='Vertical tabs example'
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  alignItems: 'flex-start'
                }}
              >
                {tabData.map(({ icon, label }, index) => (
                  <Tab
                    sx={{
                      justifyContent: 'start',
                      textTransform: 'capitalize'
                    }}
                    icon={<Icons name={icon} />}
                    iconPosition='start'
                    label={label}
                    {...a11yProps(index)}
                    key={index}
                    onClick={() => {
                      setShowSideTab(window.innerWidth > 700 ? true : false)
                    }}
                  />
                ))}
              </Tabs>
            </div>
          )}
          <div className={styles.tab_panels}>
            <TabPanel
              value={value}
              index={0}
              className={styles.tab_panel_style}
            >
              <ProfileInfo
                userProfileData={userProfileData}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WishlistCard showCross={false} />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              className={styles.tab_panel_style}
            >
              <Orders userOrderData={userOrderHistory} />
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
              className={styles.tab_panel_style}
            >
              <Settings
                resetTabValue={setValue}
                userProfileData={userProfileData}
              />
            </TabPanel>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default UserProfilePage
