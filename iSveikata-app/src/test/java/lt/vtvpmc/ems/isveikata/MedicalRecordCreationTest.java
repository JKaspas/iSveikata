package lt.vtvpmc.ems.isveikata;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
@ContextConfiguration
@WithMockUser
public class MedicalRecordCreationTest {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;



    @Before
    public void init(){
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }


    @Test
    public void performAdminLogin() throws Exception{
        mockMvc.perform(post("/api/login")
                .param("userName", "root").param("password", "123"))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void performDoctorLogin() throws Exception{
        mockMvc.perform(post("/api/login")
                .param("userName", "AntPet601").param("password", "esz6o86o"))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void medicalRecordCanBeCreated() throws Exception{
        Random rand = new Random();

        Map<String, Object> appointmentMap = new HashMap<>();
        appointmentMap.put("description", "Aprasymas");
        appointmentMap.put("duration", 15);
        appointmentMap.put("date", new Date());

        Map<String, Object> recordMap = new HashMap<>();
        recordMap.put("isCompensable", rand.nextInt(1) == 0 ? false : true);
        recordMap.put("isRepetitive",  rand.nextInt(1) == 0 ? false : true);

        Map<String, Object> objectMap = new HashMap<>();
        objectMap.put("icdCode", getRandomIcdCode());
        objectMap.put("userName", getRandomDoctorUserName());
        objectMap.put("patientId", getRandomPatientPatientId());
        objectMap.put("appointemt", appointmentMap);
        objectMap.put("medicalRecord", recordMap);


        performDoctorLogin();
        mockMvc.perform(post("/api/doctor/new/record")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(objectMap)))
                .andDo(print())
                .andExpect(status().isCreated());



    }


    public String getRandomPatientPatientId() throws Exception{
        performAdminLogin();
        ObjectMapper mapper = new ObjectMapper();
        Random rand = new Random();

        MvcResult result = mockMvc.perform(get("/api/patient/?page=0&size=2000"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();
        Map<String, List<Map<String, String>>> resultMap = mapper.readValue(result.getResponse().getContentAsByteArray(), HashMap.class);
        System.out.println(resultMap.keySet());
        System.out.println(resultMap.get("size"));
        int randomPatientIndex = rand.nextInt(resultMap.get("content").size());
        String randomPatientPatientId = resultMap.get("content").get(randomPatientIndex).get("id");

        return randomPatientPatientId;
    }

    public String getRandomDoctorUserName() throws Exception{
        performAdminLogin();


        ObjectMapper mapper = new ObjectMapper();
        Random rand = new Random();

        MvcResult result = mockMvc.perform(get("/api/doctor?page=0&size=2000"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();


        Map<String, List<Map<String, String>>> doctorMap = mapper.readValue(result.getResponse().getContentAsByteArray(), HashMap.class);

        int randomUserIndex = rand.nextInt(doctorMap.get("content").size());
        String randomEmployeeUserName = doctorMap.get("content").get(randomUserIndex).get("userName");



        return randomEmployeeUserName;

    }

    public String getRandomIcdCode() throws Exception{
        performDoctorLogin();
        ObjectMapper mapper = new ObjectMapper();
        Random rand = new Random();

        MvcResult result = mockMvc.perform(get("/api/icd"))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        List<Map<String,Object>> objectList= mapper.readValue(result.getResponse().getContentAsByteArray(), List.class);
        int randomIndex = rand.nextInt(objectList.size());
        System.out.println(objectList.get(randomIndex).get("icdCode"));
        return (String)objectList.get(randomIndex).get("icdCode");

    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
