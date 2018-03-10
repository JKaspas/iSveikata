package lt.vtvpmc.ems.isveikata;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.security.auth.UserPrincipal;
import lt.vtvpmc.ems.isveikata.patient.Patient;
import lt.vtvpmc.ems.isveikata.patient.PatientService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.Cookie;
import java.util.Arrays;
import java.util.Date;
import java.util.stream.Collectors;

import static org.hamcrest.Matchers.greaterThan;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
@ContextConfiguration
@WithMockUser
public class EmployeesControllerTestWithSecurity {

    private MockMvc mockMvc;


    @Autowired
    private WebApplicationContext webApplicationContext;

    @Mock
    private PatientService patientService;


    @Before
    public void init(){
        mockMvc = MockMvcBuilders
                .webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    public void createPatient() throws Exception{

        final Patient patient = new Patient();
        patient.setFirstName("Jomantas");
        patient.setLastName("Pabredis");
        patient.setPatientId("39584654897");
        patient.setPassword("123");
        patient.setBirthDate(new Date());



        mockMvc.perform(post("/api/login")
                .param("userName", "root").param("password", "123"))
                .andExpect(status().is2xxSuccessful())
                .andDo(print());


        mockMvc.perform(
                post("/api/admin/new/patient")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(patient)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(content().string("Sukurtas naujas pacientas"));


    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
